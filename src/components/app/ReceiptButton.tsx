import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { downloadReceipt, type ReceiptTicket } from "@/lib/receipt";
import { fetchTicketNames } from "@/lib/ticket-names";
import { toast } from "sonner";

type Ticket = ReceiptTicket & { customer_id?: string | null; technician_id?: string | null };

export function ReceiptButton({
  ticket,
  fallbackCustomerName,
  label = "Receipt",
  showLabel = true,
}: {
  ticket: Ticket;
  fallbackCustomerName?: string | null;
  label?: string;
  showLabel?: boolean;
}) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    setBusy(true);
    try {
      const names = await fetchTicketNames(ticket);
      await downloadReceipt(ticket, {
        customerName: names.customerName || fallbackCustomerName || null,
        technicianName: names.technicianName || null,
      });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not generate the receipt.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={onClick} disabled={busy} aria-label="Download receipt">
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
      {showLabel && <span className="ml-1.5">{label}</span>}
    </Button>
  );
}
