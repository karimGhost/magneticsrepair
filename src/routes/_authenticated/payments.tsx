import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ShieldAlert, Smartphone, Banknote, CreditCard, Landmark, Wallet } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/payments")({
  head: () => ({
    meta: [
      { title: "Payments — Magnetic Repair" },
      { name: "description", content: "Record and reconcile M-Pesa, cash, card and bank payments for device repairs." },
      { property: "og:title", content: "Payments — Magnetic Repair" },
      { property: "og:description", content: "Repair payment ledger for the Magnetic Repair workshop." },
    ],
  }),
  component: PaymentsPage,
});

type Method = "mpesa" | "cash" | "card" | "bank";

const METHOD_META: Record<Method, { label: string; icon: typeof Smartphone }> = {
  mpesa: { label: "M-Pesa", icon: Smartphone },
  cash: { label: "Cash", icon: Banknote },
  card: { label: "Card", icon: CreditCard },
  bank: { label: "Bank transfer", icon: Landmark },
};

const paymentSchema = z.object({
  ticket_id: z.string().uuid("Select a repair"),
  amount: z.coerce.number().positive("Amount must be greater than zero").max(10000000),
  method: z.enum(["mpesa", "cash", "card", "bank"]),
  reference: z.string().trim().max(80).optional(),
});

function PaymentsPage() {
  const { user, roles } = useAuth();
  const staff = roles.includes("admin") || roles.includes("technician");
  const [payments, setPayments] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [method, setMethod] = useState<Method>("mpesa");

  const load = async () => {
    const [{ data: pay }, { data: tk }] = await Promise.all([
      supabase.from("payments").select("*").order("created_at", { ascending: false }),
      supabase.from("repair_tickets").select("id,tracking_id,brand,model,total_amount,deposit_paid").order("created_at", { ascending: false }),
    ]);
    setPayments(pay ?? []);
    setTickets(tk ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [user]);

  const record = async (form: HTMLFormElement) => {
    const fd = Object.fromEntries(new FormData(form).entries());
    const parsed = paymentSchema.safeParse({ ...fd, ticket_id: ticketId, method });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    const { error } = await supabase.from("payments").insert({ ...parsed.data, recorded_by: user!.id });
    if (error) return toast.error(error.message);

    const ticket = tickets.find((t) => t.id === parsed.data.ticket_id);
    if (ticket) {
      await supabase
        .from("repair_tickets")
        .update({ deposit_paid: Number(ticket.deposit_paid || 0) + parsed.data.amount })
        .eq("id", ticket.id);
    }
    toast.success("Payment recorded");
    setOpen(false);
    form.reset();
    load();
  };

  const total = payments.filter((p) => p.status === "confirmed").reduce((s, p) => s + Number(p.amount || 0), 0);
  const byMethod = (m: Method) => payments.filter((p) => p.method === m).reduce((s, p) => s + Number(p.amount || 0), 0);
  const ticketLabel = (id: string) => {
    const t = tickets.find((x) => x.id === id);
    return t ? `${t.tracking_id} · ${t.brand ?? ""} ${t.model ?? ""}`.trim() : "Repair";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Finance</div>
          <h1 className="mt-1 text-3xl font-semibold">Payments</h1>
        </div>
        {staff && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1.5" /> Record payment</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Record a payment</DialogTitle></DialogHeader>
              <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); record(e.currentTarget); }}>
                <Select value={ticketId} onValueChange={setTicketId}>
                  <SelectTrigger><SelectValue placeholder="Select repair" /></SelectTrigger>
                  <SelectContent>
                    {tickets.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.tracking_id} · {t.brand} {t.model}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={method} onValueChange={(v) => setMethod(v as Method)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(Object.keys(METHOD_META) as Method[]).map((m) => (
                      <SelectItem key={m} value={m}>{METHOD_META[m].label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input name="amount" type="number" min={1} step="0.01" placeholder="Amount (KSh)" required />
                <Input name="reference" placeholder="Reference / M-Pesa code" />
                <Button type="submit" className="bg-gradient-primary">Save payment</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card className="shadow-card"><CardContent className="p-5">
          <div className="flex items-center justify-between"><div className="text-xs text-muted-foreground">Collected</div><Wallet className="h-4 w-4 text-primary" /></div>
          <div className="mt-3 text-2xl font-semibold">KSh {total.toLocaleString()}</div>
        </CardContent></Card>
        {(Object.keys(METHOD_META) as Method[]).map((m) => {
          const Icon = METHOD_META[m].icon;
          return (
            <Card key={m} className="shadow-card"><CardContent className="p-5">
              <div className="flex items-center justify-between"><div className="text-xs text-muted-foreground">{METHOD_META[m].label}</div><Icon className="h-4 w-4 text-primary" /></div>
              <div className="mt-3 text-xl font-semibold">KSh {byMethod(m).toLocaleString()}</div>
            </CardContent></Card>
          );
        })}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Payment ledger</h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : payments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              {staff ? "No payments recorded yet." : "No payments on your repairs yet."}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {payments.map((p) => (
                <div key={p.id} className="py-4 grid md:grid-cols-4 gap-3 items-center">
                  <div>
                    <div className="font-medium">{ticketLabel(p.ticket_id)}</div>
                    <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</div>
                  </div>
                  <Badge variant="secondary" className="justify-self-start">{METHOD_META[p.method as Method]?.label ?? p.method}</Badge>
                  <div className="text-sm font-mono text-muted-foreground">{p.reference || "—"}</div>
                  <div className="md:text-right font-semibold">KSh {Number(p.amount).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {!staff && payments.length === 0 && (
        <p className="flex items-center gap-2 text-xs text-muted-foreground"><ShieldAlert className="h-3.5 w-3.5" /> You only see payments linked to your own repairs.</p>
      )}
    </div>
  );
}
