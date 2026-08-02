import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { askAssistant } from "@/lib/assistant.functions";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Wrench } from "lucide-react";

export const Route = createFileRoute("/_authenticated/book")({
  head: () => ({
    meta: [
      { title: "Book a repair — Magnetic Repair" },
      { name: "description", content: "Describe your device fault and book a warrantied repair with Magnetic Repair." },
      { property: "og:title", content: "Book a repair — Magnetic Repair" },
      { property: "og:description", content: "Describe your device fault and book a warrantied repair." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

const device_types = ["Phone", "Laptop", "Tablet", "TV", "Console", "Other"];

function BookPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const ask = useServerFn(askAssistant);
  const [busy, setBusy] = useState(false);
  const [aiBusy, setAiBusy] = useState(false);
  const [advice, setAdvice] = useState("");
  const [form, setForm] = useState({
    device_type: "Phone", brand: "", model: "", serial_number: "", problem_reported: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const askAi = async () => {
    if (!form.problem_reported.trim()) return toast.error("Describe the problem first.");
    setAiBusy(true);
    try {
      const res = await ask({
        data: {
          messages: [{
            role: "user" as const,
            content: `Device: ${form.device_type} ${form.brand} ${form.model}. Problem: ${form.problem_reported}. Give a likely diagnosis, rough KSh cost range and expected turnaround. Keep it under 120 words.`,
          }],
        },
      });
      setAdvice(res.text);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "AI is unavailable right now.");
    } finally {
      setAiBusy(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!form.problem_reported.trim()) return toast.error("Please describe the problem.");
    setBusy(true);
    const { data, error } = await supabase.from("repair_tickets").insert({
      customer_id: user.id,
      device_type: form.device_type,
      brand: form.brand || null,
      model: form.model || null,
      serial_number: form.serial_number || null,
      problem_reported: form.problem_reported,
    }).select("tracking_id").single();
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`Booked! Tracking ID ${data.tracking_id}`);
    nav({ to: "/dashboard" });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">New request</div>
        <h1 className="mt-1 text-3xl font-semibold">Book a repair</h1>
        <p className="mt-1 text-sm text-muted-foreground">Tell us what's wrong. You'll get a tracking ID instantly.</p>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Device type</Label>
                <div className="flex flex-wrap gap-2">
                  {device_types.map((d) => (
                    <button type="button" key={d} onClick={() => set("device_type", d)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${form.device_type === d ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-accent"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="Apple, Samsung, HP…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="iPhone 13, ThinkPad X1…" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial">Serial / IMEI (optional)</Label>
                <Input id="serial" value={form.serial_number} onChange={(e) => set("serial_number", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem">What's the problem?</Label>
              <Textarea id="problem" rows={4} value={form.problem_reported} onChange={(e) => set("problem_reported", e.target.value)}
                placeholder="Screen cracked and touch not responding on the left side…" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={askAi} disabled={aiBusy}>
                {aiBusy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Ask AI for a quick diagnosis
              </Button>
              <Button type="submit" disabled={busy} className="bg-gradient-primary shadow-elegant">
                {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Wrench className="h-4 w-4 mr-2" />}
                Submit booking
              </Button>
            </div>

            {advice && (
              <div className="rounded-xl border border-border bg-accent/40 p-4 text-sm whitespace-pre-wrap">
                <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> AI estimate
                </div>
                {advice}
                <div className="mt-2 text-xs text-muted-foreground">Estimate only — final quote follows diagnosis.</div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
