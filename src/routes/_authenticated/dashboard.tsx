import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Loader2, Wrench, DollarSign, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TicketChat } from "@/components/app/TicketChat";
import { downloadReceipt } from "@/lib/receipt";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Magnetic Repair" }, { name: "description", content: "Your repairs at a glance." }] }),
  component: CustomerDashboard,
});

const STATUS_LABEL: Record<string, string> = {
  received: "Received", diagnosing: "Diagnosing", waiting_parts: "Waiting for Parts",
  repairing: "Repairing", testing: "Testing", completed: "Completed",
  ready_pickup: "Ready for Pickup", collected: "Collected",
};

function CustomerDashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("repair_tickets").select("*").eq("customer_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setTickets(data ?? []); setLoading(false); });
  }, [user]);

  const active = tickets.filter((t) => !["collected", "completed"].includes(t.status));
  const completed = tickets.filter((t) => ["collected", "completed", "ready_pickup"].includes(t.status));
  const paid = tickets.reduce((s, t) => s + Number(t.deposit_paid || 0), 0);
  const balance = tickets.reduce((s, t) => s + Math.max(0, Number(t.total_amount || 0) - Number(t.deposit_paid || 0)), 0);

  const stats = [
    { label: "Active repairs", value: active.length, icon: Loader2 },
    { label: "Completed", value: completed.length, icon: CheckCircle2 },
    { label: "Amount paid", value: `KSh ${paid.toLocaleString()}`, icon: DollarSign },
    { label: "Balance", value: `KSh ${balance.toLocaleString()}`, icon: Clock },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Welcome back</div>
        <h1 className="mt-1 text-3xl font-semibold">Your repairs</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-3 text-2xl font-semibold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Repair history</h2>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </div>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : tickets.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center">
              <div className="text-sm text-muted-foreground">You haven't booked a repair yet.</div>
              <a href="/#services" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">Browse services →</a>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {tickets.map((t) => (
                <div key={t.id} className="py-4 grid md:grid-cols-4 gap-3 items-center">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{t.tracking_id}</div>
                    <div className="font-medium mt-1">{t.brand} {t.model}</div>
                    <div className="text-xs text-muted-foreground">{t.device_type}</div>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{t.problem_reported}</div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">{STATUS_LABEL[t.status]}</div>
                    <Progress value={t.progress} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:justify-end">
                    <Badge variant="secondary">KSh {Number(t.total_amount || 0).toLocaleString()}</Badge>
                    <TicketChat ticketId={t.id} />
                    <Button variant="outline" size="sm" onClick={() => downloadReceipt(t, user?.email)}>
                      <FileDown className="h-4 w-4 mr-1.5" /> Receipt
                    </Button>
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
