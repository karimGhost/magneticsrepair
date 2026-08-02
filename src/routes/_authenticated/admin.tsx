import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Users, Wrench, TrendingUp, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Magnetic Repair" }, { name: "description", content: "Administrator control center." }] }),
  component: AdminPage,
});

function AdminPage() {
  const { roles, user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [pendingTechs, setPendingTechs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [{ data: t }, { data: p }] = await Promise.all([
      supabase.from("repair_tickets").select("*"),
      supabase.from("profiles").select("id, full_name, phone, tech_status").eq("tech_status", "pending"),
    ]);
    setTickets(t ?? []); setPendingTechs(p ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  // Bootstrap: first signed-in user can promote self to admin if there are no admins yet.
  const bootstrapAdmin = async () => {
    if (!user) return;
    const { data, error } = await supabase.rpc("bootstrap_admin");
    if (error) return toast.error(error.message);
    if (!data) return toast.error("An administrator already exists.");
    toast.success("You're now an admin. Reloading…");
    setTimeout(() => window.location.reload(), 700);
  };


  if (!roles.includes("admin")) {
    return (
      <Card className="shadow-card"><CardContent className="p-10 text-center">
        <ShieldAlert className="h-10 w-10 text-warning mx-auto" />
        <h2 className="mt-3 text-xl font-semibold">Admin access required</h2>
        <p className="mt-1 text-sm text-muted-foreground">You don't have administrator permissions.</p>
        <Button onClick={bootstrapAdmin} className="mt-4 bg-gradient-primary">Claim admin (first-run only)</Button>
      </CardContent></Card>
    );
  }

//  // const approve = async (uid: string, approve: boolean) => {
//     const status = approve ? "approved" : "rejected";
//     const { error } = await supabase.from("profiles").update({ tech_status: status }).eq("id", uid);
//     if (error) return toast.error(error.message);
//     if (approve) await supabase.from("user_roles").upsert({ user_id: uid, role: "technician" }, { onConflict: "user_id,role" });
//     toast.success(approve ? "Technician approved" : "Rejected");
//     load();
//   };



  const approve = async (uid: string, approve: boolean) => {
  const status = approve ? "approved" : "rejected";

  const { error } = await supabase
    .from("profiles")
    .update({ tech_status: status })
    .eq("id", uid);

  if (error) return toast.error(error.message);

  if (approve) {
    // Remove existing roles
    await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", uid);

    // Insert technician
    await supabase
      .from("user_roles")
      .insert({
        user_id: uid,
        role: "technician",
      });
  }

  toast.success(approve ? "Technician approved" : "Rejected");
  load();
};

  const revenue = tickets.reduce((s, t) => s + Number(t.total_amount || 0), 0);

  // Build monthly chart data
  const now = new Date();
  const months = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const key = d.toLocaleString(undefined, { month: "short" });
    const r = tickets.filter((t) => { const td = new Date(t.created_at); return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear(); });
    return { month: key, repairs: r.length, revenue: r.reduce((s, x) => s + Number(x.total_amount || 0), 0) };
  });

  const stats = [
    { label: "Total revenue", value: `KSh ${revenue.toLocaleString()}`, icon: TrendingUp },
    { label: "Repairs", value: tickets.length, icon: Wrench },
    { label: "Completed", value: tickets.filter((t) => ["completed","collected","ready_pickup"].includes(t.status)).length, icon: CheckCircle2 },
    { label: "Pending techs", value: pendingTechs.length, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Administrator</div>
        <h1 className="mt-1 text-3xl font-semibold">Control center</h1>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Revenue · last 6 months</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={months}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Pending technician approvals</h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : pendingTechs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending approvals.</p>
          ) : (
            <div className="divide-y divide-border">
              {pendingTechs.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{p.full_name || "Unnamed"}</div>
                    <div className="text-xs text-muted-foreground">{p.phone}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => approve(p.id, false)}>Reject</Button>
                    <Button size="sm" className="bg-gradient-primary" onClick={() => approve(p.id, true)}>Approve</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent tickets</h2>
          <div className="divide-y divide-border">
            {tickets.slice(0, 8).map((t) => (
              <div key={t.id} className="py-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{t.tracking_id}</div>
                  <div className="font-medium">{t.brand} {t.model} — <span className="text-muted-foreground font-normal">{t.problem_reported}</span></div>
                </div>
                <Badge variant="secondary">{t.status}</Badge>
              </div>
            ))}
            {tickets.length === 0 && <p className="py-6 text-center text-sm text-muted-foreground">No tickets yet.</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
