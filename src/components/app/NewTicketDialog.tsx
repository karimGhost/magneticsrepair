import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus } from "lucide-react";

const DEVICE_TYPES = ["Phone", "Laptop", "Tablet", "TV", "Console", "Other"];

type Profile = { id: string; full_name: string | null; phone: string | null };

export function NewTicketDialog({ onCreated }: { onCreated?: () => void }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [customers, setCustomers] = useState<Profile[]>([]);
  const [form, setForm] = useState({
    customer_id: "",
    device_type: "Phone",
    brand: "",
    model: "",
    serial_number: "",
    problem_reported: "",
    estimated_cost: "",
    labour_cost: "",
    deposit_paid: "",
    assign_me: true,
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!open) return;
    supabase
      .from("profiles")
      .select("id, full_name, phone")
      .order("created_at", { ascending: false })
      .limit(200)
      .then(({ data, error }) => {
        if (error) return toast.error(error.message);
        setCustomers((data ?? []) as Profile[]);
      });
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.customer_id) return toast.error("Select the customer this repair belongs to.");
    if (!form.problem_reported.trim()) return toast.error("Describe the reported problem.");

    setBusy(true);
    const estimated = Number(form.estimated_cost || 0);
    const labour = Number(form.labour_cost || 0);
    const deposit = Number(form.deposit_paid || 0);

    const { data, error } = await supabase
      .from("repair_tickets")
      .insert({
        customer_id: form.customer_id,
        technician_id: form.assign_me ? user.id : null,
        device_type: form.device_type,
        brand: form.brand || null,
        model: form.model || null,
        serial_number: form.serial_number || null,
        problem_reported: form.problem_reported,
        estimated_cost: estimated,
        labour_cost: labour,
        deposit_paid: deposit,
        total_amount: estimated + labour,
      })
      .select("id, tracking_id")
      .single();

    if (error) {
      setBusy(false);
      return toast.error(error.message);
    }

    await supabase.from("repair_updates").insert({
      ticket_id: data.id,
      author_id: user.id,
      status: "received",
      note: "Ticket created at the workshop",
    });
    await supabase.from("notifications").insert({
      user_id: form.customer_id,
      title: "Repair ticket created",
      body: `Your repair ${data.tracking_id} has been logged at Magnetic Repair.`,
    });

    setBusy(false);
    setOpen(false);
    setForm((f) => ({ ...f, problem_reported: "", brand: "", model: "", serial_number: "", estimated_cost: "", labour_cost: "", deposit_paid: "" }));
    toast.success(`Ticket ${data.tracking_id} created`);
    onCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary shadow-elegant">
          <Plus className="h-4 w-4 mr-1.5" /> New repair ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>New repair ticket</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>Customer</Label>
            <Select value={form.customer_id} onValueChange={(v) => set("customer_id", v)}>
              <SelectTrigger><SelectValue placeholder="Select a customer" /></SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.full_name || c.phone || c.id.slice(0, 8)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Device type</Label>
              <Select value={form.device_type} onValueChange={(v) => set("device_type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{DEVICE_TYPES.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nt-brand">Brand</Label>
              <Input id="nt-brand" value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Apple, Samsung…" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nt-model">Model</Label>
              <Input id="nt-model" value={form.model} onChange={(e) => set("model", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nt-serial">Serial / IMEI</Label>
              <Input id="nt-serial" value={form.serial_number} onChange={(e) => set("serial_number", e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nt-problem">Reported problem</Label>
            <Textarea id="nt-problem" rows={3} value={form.problem_reported} onChange={(e) => set("problem_reported", e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="nt-est">Estimated (KSh)</Label>
              <Input id="nt-est" type="number" min="0" value={form.estimated_cost} onChange={(e) => set("estimated_cost", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nt-lab">Labour (KSh)</Label>
              <Input id="nt-lab" type="number" min="0" value={form.labour_cost} onChange={(e) => set("labour_cost", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nt-dep">Deposit (KSh)</Label>
              <Input id="nt-dep" type="number" min="0" value={form.deposit_paid} onChange={(e) => set("deposit_paid", e.target.value)} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={form.assign_me} onChange={(e) => set("assign_me", e.target.checked)} className="accent-primary" />
            Assign this repair to me
          </label>

          <DialogFooter>
            <Button type="submit" disabled={busy} className="bg-gradient-primary">
              {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Create ticket
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
