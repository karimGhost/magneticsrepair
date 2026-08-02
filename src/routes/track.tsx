import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/track")({
  validateSearch: (s) => z.object({ q: z.string().optional() }).parse(s),
  head: () => ({ meta: [{ title: "Track Repair — Magnetic Repair" }, { name: "description", content: "Track your device repair in real time." }] }),
  component: TrackPage,
});

const STATUS_LABEL: Record<string, string> = {
  received: "Received", diagnosing: "Diagnosing", waiting_parts: "Waiting for Parts",
  repairing: "Repairing", testing: "Testing", completed: "Completed",
  ready_pickup: "Ready for Pickup", collected: "Collected",
};
const STAGES = ["received","diagnosing","waiting_parts","repairing","testing","completed","ready_pickup","collected"];

function TrackPage() {
  const { q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [notFound, setNotFound] = useState(false);

  const search = async (val: string) => {
    if (!val.trim()) return;
    setLoading(true); setNotFound(false); setTicket(null);
    const { data } = await supabase.from("repair_tickets").select("*").or(`tracking_id.eq.${val},serial_number.eq.${val},imei.eq.${val}`).limit(1).maybeSingle();
    if (data) {
      setTicket(data);
      const { data: u } = await supabase.from("repair_updates").select("*").eq("ticket_id", data.id).order("created_at", { ascending: false });
      setUpdates(u ?? []);
    } else setNotFound(true);
    setLoading(false);
  };

  useEffect(() => { if (q) search(q); }, [q]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 pb-16">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Track Repair</div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Where's my device?</h1>
          <p className="mt-2 text-muted-foreground">Enter tracking ID, serial number, or IMEI.</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); search(query); }} className="mt-8 flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-card">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="MAG-2026-000123" className="border-0 shadow-none focus-visible:ring-0" />
          </div>
          <Button type="submit" disabled={loading} className="bg-gradient-primary">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track"}</Button>
        </form>

        {notFound && <p className="mt-6 text-center text-sm text-muted-foreground">No repair found for "{query}".</p>}

        {ticket && (
          <div className="mt-10 space-y-6">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap justify-between gap-4">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{ticket.tracking_id}</div>
                    <div className="text-xl font-semibold mt-1">{ticket.brand} {ticket.model}</div>
                    <div className="text-sm text-muted-foreground">{ticket.device_type}</div>
                  </div>
                  <Badge className="bg-gradient-primary text-primary-foreground h-fit">{STATUS_LABEL[ticket.status]}</Badge>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span><span>{ticket.progress}%</span>
                  </div>
                  <Progress value={ticket.progress} />
                </div>
                <div className="mt-6 grid sm:grid-cols-3 gap-4 text-sm">
                  <div><div className="text-muted-foreground text-xs">Reported</div>{ticket.problem_reported}</div>
                  <div><div className="text-muted-foreground text-xs">Diagnosis</div>{ticket.diagnosis || "—"}</div>
                  <div><div className="text-muted-foreground text-xs">Expected completion</div>{ticket.expected_completion || "—"}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="font-semibold mb-4">Timeline</div>
                <ol className="relative border-l border-border pl-6 space-y-5">
                  {STAGES.map((s) => {
                    const active = STAGES.indexOf(s) <= STAGES.indexOf(ticket.status);
                    return (
                      <li key={s} className="relative">
                        <span className={`absolute -left-[29px] grid h-5 w-5 place-items-center rounded-full ${active ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          {active && <CheckCircle2 className="h-3 w-3" />}
                        </span>
                        <div className={`text-sm font-medium ${active ? "" : "text-muted-foreground"}`}>{STATUS_LABEL[s]}</div>
                      </li>
                    );
                  })}
                </ol>
                {updates.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="text-sm font-medium mb-3">Technician notes</div>
                    <ul className="space-y-3">
                      {updates.map((u) => (
                        <li key={u.id} className="text-sm">
                          <div className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleString()}</div>
                          <div>{u.note}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
