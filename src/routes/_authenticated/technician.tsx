import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, ClipboardList, CheckCircle2, TrendingUp, ShieldAlert } from "lucide-react";
import { TicketChat } from "@/components/app/TicketChat";
import { ReceiptButton } from "@/components/app/ReceiptButton";
import { NewTicketDialog } from "@/components/app/NewTicketDialog";
import { EditAmountsDialog } from "@/components/app/EditAmountsDialog";

export const Route = createFileRoute("/_authenticated/technician")({
  head: () => ({ meta: [{ title: "Technician — Magnetic Repair" }, { name: "description", content: "Manage assigned repairs." }] }),
  component: TechPage,
});

const STAGES = ["received","diagnosing","waiting_parts","repairing","testing","completed","ready_pickup","collected"];
const LABEL: Record<string, string> = {
  received: "Received", diagnosing: "Diagnosing", waiting_parts: "Waiting for Parts",
  repairing: "Repairing", testing: "Testing", completed: "Completed",
  ready_pickup: "Ready for Pickup", collected: "Collected",
};
const PROGRESS: Record<string, number> = { received: 10, diagnosing: 25, waiting_parts: 40, repairing: 60, testing: 80, completed: 90, ready_pickup: 95, collected: 100 };

function TechPage() {
  const { user, roles } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    let q = supabase.from("repair_tickets").select("*").order("created_at", { ascending: false });
    if (!roles.includes("admin")) q = q.eq("technician_id", user.id);
    const { data } = await q;
    setTickets(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [user, roles]);

  if (!roles.includes("technician") && !roles.includes("admin")) {
    return (
      <Card className="shadow-card"><CardContent className="p-10 text-center">
        <ShieldAlert className="h-10 w-10 text-warning mx-auto" />
        <h2 className="mt-3 text-xl font-semibold">Awaiting approval</h2>
        <p className="mt-1 text-sm text-muted-foreground">Your technician account is pending administrator approval.</p>
      </CardContent></Card>
    );
  }

  const updateStatus = async (id: string, status: string) => {
    const s = status as "received"|"diagnosing"|"waiting_parts"|"repairing"|"testing"|"completed"|"ready_pickup"|"collected";
    const { error } = await supabase.from("repair_tickets").update({ status: s, progress: PROGRESS[status] ?? 0 }).eq("id", id);
    if (error) return toast.error(error.message);
    await supabase.from("repair_updates").insert({ ticket_id: id, author_id: user!.id, status: s, note: `Status updated to ${LABEL[status]}` });
    toast.success("Status updated");
    load();
  };

  const stats = [
    { label: "Assigned", value: tickets.length, icon: ClipboardList },
    { label: "In progress", value: tickets.filter((t) => ["diagnosing","repairing","testing","waiting_parts"].includes(t.status)).length, icon: Wrench },
    { label: "Completed", value: tickets.filter((t) => ["completed","ready_pickup","collected"].includes(t.status)).length, icon: CheckCircle2 },
    { label: "This month", value: tickets.filter((t) => new Date(t.created_at).getMonth() === new Date().getMonth()).length, icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Technician</div>
          <h1 className="mt-1 text-3xl font-semibold">Workbench</h1>
        </div>
        <NewTicketDialog onCreated={load} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card"><CardContent className="p-5">
            <div className="flex items-center justify-between"><div className="text-xs text-muted-foreground">{s.label}</div><s.icon className="h-4 w-4 text-primary" /></div>
            <div className="mt-3 text-2xl font-semibold">{s.value}</div>
          </CardContent></Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Assigned repairs</h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : tickets.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No repairs assigned yet.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {tickets.map((t) => (
                <div key={t.id} className="py-4 grid md:grid-cols-5 gap-3 items-center">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{t.tracking_id}</div>
                    <div className="font-medium mt-1">{t.brand} {t.model}</div>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{t.problem_reported}</div>
                  <div className="md:col-span-1">
                    <Progress value={t.progress} />
                    <div className="text-xs text-muted-foreground mt-1">{LABEL[t.status]}</div>
                  </div>
                  <Select value={t.status} onValueChange={(v) => updateStatus(t.id, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{STAGES.map((s) => (<SelectItem key={s} value={s}>{LABEL[s]}</SelectItem>))}</SelectContent>
                  </Select>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    <Badge variant="secondary">KSh {Number(t.total_amount || 0).toLocaleString()}</Badge>
                    <TicketChat ticketId={t.id} />
                    <EditAmountsDialog ticket={t} onSaved={load} />
                    <ReceiptButton ticket={t} showLabel={false} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
