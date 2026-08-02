CREATE POLICY "profiles read staff" ON public.profiles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'technician'));