import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Receipt } from "lucide-react";

type Ticket = {
  id: string;
  tracking_id: string;
  estimated_cost?: number | null;
  labour_cost?: number | null;
  deposit_paid?: number | null;
  total_amount?: number | null;
};

export function EditAmountsDialog({ ticket, onSaved }: { ticket: Ticket; onSaved?: () => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [estimated, setEstimated] = useState(String(ticket.estimated_cost ?? 0));
  const [labour, setLabour] = useState(String(ticket.labour_cost ?? 0));
  const [deposit, setDeposit] = useState(String(ticket.deposit_paid ?? 0));

  const total = Number(estimated || 0) + Number(labour || 0);
  const balance = Math.max(0, total - Number(deposit || 0));

  const save = async () => {
    setBusy(true);
    const { error } = await supabase
      .from("repair_tickets")
      .update({
        estimated_cost: Number(estimated || 0),
        labour_cost: Number(labour || 0),
        deposit_paid: Number(deposit || 0),
        total_amount: total,
      })
      .eq("id", ticket.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Amounts updated");
    setOpen(false);
    onSaved?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Edit amounts"><Receipt className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Amounts · {ticket.tracking_id}</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor={`est-${ticket.id}`}>Estimated cost (KSh)</Label>
            <Input id={`est-${ticket.id}`} type="number" min="0" value={estimated} onChange={(e) => setEstimated(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`lab-${ticket.id}`}>Labour (KSh)</Label>
            <Input id={`lab-${ticket.id}`} type="number" min="0" value={labour} onChange={(e) => setLabour(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`dep-${ticket.id}`}>Deposit paid (KSh)</Label>
            <Input id={`dep-${ticket.id}`} type="number" min="0" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
          </div>
          <div className="rounded-lg border border-border bg-accent/40 p-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-semibold">KSh {total.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Balance due</span><span className="font-semibold">KSh {balance.toLocaleString()}</span></div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={save} disabled={busy} className="bg-gradient-primary">
            {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
