import { supabase } from "@/integrations/supabase/client";

export interface TicketNames {
  customerName?: string | null;
  technicianName?: string | null;
}

/** Resolves customer + technician display names for a ticket (best effort — RLS may hide some). */
export async function fetchTicketNames(ticket: { customer_id?: string | null; technician_id?: string | null }): Promise<TicketNames> {
  const ids = [ticket.customer_id, ticket.technician_id].filter((v): v is string => !!v);
  if (ids.length === 0) return {};
  const { data } = await supabase.from("profiles").select("id, full_name, phone").in("id", ids);
  const find = (id?: string | null) => {
    if (!id) return null;
    const p = data?.find((row) => row.id === id);
    return p?.full_name || p?.phone || null;
  };
  return { customerName: find(ticket.customer_id), technicianName: find(ticket.technician_id) };
}
