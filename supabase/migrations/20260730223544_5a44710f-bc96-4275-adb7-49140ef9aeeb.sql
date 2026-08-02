
-- INVENTORY
CREATE TABLE public.inventory_parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sku text UNIQUE,
  category text,
  quantity integer NOT NULL DEFAULT 0,
  reorder_level integer NOT NULL DEFAULT 5,
  cost_price numeric NOT NULL DEFAULT 0,
  sale_price numeric NOT NULL DEFAULT 0,
  supplier text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.inventory_parts TO authenticated;
GRANT ALL ON public.inventory_parts TO service_role;
ALTER TABLE public.inventory_parts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "parts read authed" ON public.inventory_parts FOR SELECT TO authenticated USING (true);
CREATE POLICY "parts insert tech/admin" ON public.inventory_parts FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'technician'));
CREATE POLICY "parts update tech/admin" ON public.inventory_parts FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'technician'));
CREATE POLICY "parts delete admin" ON public.inventory_parts FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_parts_updated BEFORE UPDATE ON public.inventory_parts
  FOR EACH ROW EXECUTE FUNCTION public.tg_updated_at();

CREATE TABLE public.ticket_parts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.repair_tickets(id) ON DELETE CASCADE,
  part_id uuid NOT NULL REFERENCES public.inventory_parts(id),
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ticket_parts TO authenticated;
GRANT ALL ON public.ticket_parts TO service_role;
ALTER TABLE public.ticket_parts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ticket parts read" ON public.ticket_parts FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.repair_tickets t WHERE t.id = ticket_id
    AND (t.customer_id = auth.uid() OR t.technician_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "ticket parts write tech/admin" ON public.ticket_parts FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'technician'));
CREATE POLICY "ticket parts delete tech/admin" ON public.ticket_parts FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'technician'));

CREATE OR REPLACE FUNCTION public.tg_consume_stock()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  UPDATE public.inventory_parts SET quantity = GREATEST(quantity - NEW.quantity, 0) WHERE id = NEW.part_id;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_consume_stock AFTER INSERT ON public.ticket_parts
  FOR EACH ROW EXECUTE FUNCTION public.tg_consume_stock();

-- PAYMENTS
CREATE TYPE public.payment_method AS ENUM ('mpesa','cash','card','bank');
CREATE TYPE public.payment_status AS ENUM ('pending','confirmed','failed','refunded');

CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.repair_tickets(id) ON DELETE CASCADE,
  amount numeric NOT NULL DEFAULT 0,
  method public.payment_method NOT NULL DEFAULT 'cash',
  reference text,
  status public.payment_status NOT NULL DEFAULT 'confirmed',
  recorded_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payments read" ON public.payments FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.repair_tickets t WHERE t.id = ticket_id
    AND (t.customer_id = auth.uid() OR t.technician_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "payments insert tech/admin" ON public.payments FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'technician'));
CREATE POLICY "payments update admin" ON public.payments FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "payments delete admin" ON public.payments FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.tg_updated_at();

-- REVIEWS
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES public.repair_tickets(id) ON DELETE SET NULL,
  customer_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text,
  reply text,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews public read approved" ON public.reviews FOR SELECT TO anon USING (approved = true);
CREATE POLICY "reviews read authed" ON public.reviews FOR SELECT TO authenticated
  USING (approved = true OR customer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "reviews insert own" ON public.reviews FOR INSERT TO authenticated
  WITH CHECK (customer_id = auth.uid());
CREATE POLICY "reviews update own or admin" ON public.reviews FOR UPDATE TO authenticated
  USING (customer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "reviews delete own or admin" ON public.reviews FOR DELETE TO authenticated
  USING (customer_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_reviews_updated BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.tg_updated_at();

-- CHAT
CREATE TABLE public.ticket_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid NOT NULL REFERENCES public.repair_tickets(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  body text NOT NULL,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.ticket_messages TO authenticated;
GRANT ALL ON public.ticket_messages TO service_role;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages read participants" ON public.ticket_messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.repair_tickets t WHERE t.id = ticket_id
    AND (t.customer_id = auth.uid() OR t.technician_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "messages insert participants" ON public.ticket_messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid() AND EXISTS (SELECT 1 FROM public.repair_tickets t WHERE t.id = ticket_id
    AND (t.customer_id = auth.uid() OR t.technician_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "messages update participants" ON public.ticket_messages FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.repair_tickets t WHERE t.id = ticket_id
    AND (t.customer_id = auth.uid() OR t.technician_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

CREATE INDEX idx_ticket_messages_ticket ON public.ticket_messages(ticket_id, created_at);
CREATE INDEX idx_payments_ticket ON public.payments(ticket_id);
CREATE INDEX idx_ticket_parts_ticket ON public.ticket_parts(ticket_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.ticket_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.repair_tickets;
