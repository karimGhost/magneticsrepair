
-- ROLES
CREATE TYPE public.app_role AS ENUM ('customer', 'technician', 'admin');
CREATE TYPE public.tech_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.repair_status AS ENUM ('received','diagnosing','waiting_parts','repairing','testing','completed','ready_pickup','collected');

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  address text,
  avatar_url text,
  tech_status public.tech_status,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- USER ROLES
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS(SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

-- Profile policies
CREATE POLICY "profiles read own or admin" ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "profiles insert own" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles update own or admin" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));

-- Role policies
CREATE POLICY "roles read own or admin" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "roles admin manage" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- REPAIR TICKETS
CREATE SEQUENCE public.tracking_seq START 1;
CREATE OR REPLACE FUNCTION public.gen_tracking_id() RETURNS text LANGUAGE sql AS $$
  SELECT 'MAG-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.tracking_seq')::text, 6, '0')
$$;

CREATE TABLE public.repair_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id text NOT NULL UNIQUE DEFAULT public.gen_tracking_id(),
  customer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  technician_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  device_type text NOT NULL,
  brand text,
  model text,
  serial_number text,
  imei text,
  problem_reported text NOT NULL,
  diagnosis text,
  parts_used text,
  status public.repair_status NOT NULL DEFAULT 'received',
  progress int NOT NULL DEFAULT 0,
  estimated_cost numeric(12,2) DEFAULT 0,
  labour_cost numeric(12,2) DEFAULT 0,
  deposit_paid numeric(12,2) DEFAULT 0,
  total_amount numeric(12,2) DEFAULT 0,
  expected_completion date,
  warranty_days int DEFAULT 30,
  device_photo_url text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.repair_tickets TO authenticated;
GRANT SELECT ON public.repair_tickets TO anon;
GRANT ALL ON public.repair_tickets TO service_role;
ALTER TABLE public.repair_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tickets public track" ON public.repair_tickets FOR SELECT TO anon USING (true);
CREATE POLICY "tickets read customer/tech/admin" ON public.repair_tickets FOR SELECT TO authenticated
  USING (auth.uid() = customer_id OR auth.uid() = technician_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "tickets insert admin/tech" ON public.repair_tickets FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'technician'));
CREATE POLICY "tickets update tech/admin" ON public.repair_tickets FOR UPDATE TO authenticated
  USING (auth.uid() = technician_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "tickets delete admin" ON public.repair_tickets FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- REPAIR UPDATES
CREATE TABLE public.repair_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.repair_tickets(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id),
  status public.repair_status,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.repair_updates TO authenticated;
GRANT SELECT ON public.repair_updates TO anon;
GRANT ALL ON public.repair_updates TO service_role;
ALTER TABLE public.repair_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "updates public via ticket" ON public.repair_updates FOR SELECT TO anon USING (true);
CREATE POLICY "updates read authed" ON public.repair_updates FOR SELECT TO authenticated
  USING (EXISTS(SELECT 1 FROM public.repair_tickets t WHERE t.id = ticket_id
     AND (t.customer_id = auth.uid() OR t.technician_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "updates insert tech/admin" ON public.repair_updates FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'technician'));

-- NOTIFICATIONS
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notif read own" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "notif update own" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- TIMESTAMPS
CREATE OR REPLACE FUNCTION public.tg_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.tg_updated_at();
CREATE TRIGGER trg_tickets_updated BEFORE UPDATE ON public.repair_tickets FOR EACH ROW EXECUTE FUNCTION public.tg_updated_at();

-- AUTO PROFILE + ROLE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  requested_role text := coalesce(NEW.raw_user_meta_data->>'role','customer');
BEGIN
  INSERT INTO public.profiles(id, full_name, phone)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'phone');
  IF requested_role = 'technician' THEN
    UPDATE public.profiles SET tech_status = 'pending' WHERE id = NEW.id;
    -- do not assign technician role yet; admin must approve
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'customer');
  ELSE
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'customer');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
