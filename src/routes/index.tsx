import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, ShieldCheck, Zap, Clock, Smartphone, Laptop, Tablet, Watch, Gamepad2, Headphones,
  Star, CheckCircle2, MessageSquare, Search, Wrench, PackageCheck, Sparkles, MapPin,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Magnetic Repair — Premium Device Repair Workshop" },
      { name: "description", content: "Fast, warrantied phone, laptop, and console repairs. Book, track, and pay online." },
      { property: "og:title", content: "Magnetic Repair — Premium Device Repair" },
      { property: "og:description", content: "Book, track, and manage your device repairs with confidence." },
    ],
  }),
  component: Landing,
});

const services = [
  { icon: Smartphone, title: "Phone Repair", desc: "Screens, batteries, boards & water damage." },
  { icon: Laptop, title: "Laptop Repair", desc: "Keyboards, SSD upgrades, OS installs, cleaning." },
  { icon: Tablet, title: "Tablet Repair", desc: "Digitizers, charging ports, glass replacements." },
  { icon: Watch, title: "Smartwatch", desc: "Batteries, glass and sensor repairs." },
  { icon: Gamepad2, title: "Consoles", desc: "PS5, Xbox, Switch — HDMI, drives, fans." },
  { icon: Headphones, title: "Audio Gear", desc: "Headphones, speakers, DACs and mics." },
];

const why = [
  { icon: ShieldCheck, title: "90-day warranty", desc: "Every repair backed by our written warranty." },
  { icon: Zap, title: "Same-day fixes", desc: "Most repairs completed within 24 hours." },
  { icon: Clock, title: "Live tracking", desc: "Watch your repair progress in real time." },
  { icon: Sparkles, title: "Certified techs", desc: "Board-level trained, factory-grade parts." },
];

const process = [
  { icon: MessageSquare, title: "Book", desc: "Tell us the issue. Get an instant quote." },
  { icon: PackageCheck, title: "Drop off", desc: "Bring your device or request a pickup." },
  { icon: Wrench, title: "Repair", desc: "Certified technicians fix and quality-check." },
  { icon: CheckCircle2, title: "Collect", desc: "Pay securely. Enjoy your warrantied device." },
];

const reviews = [
  { name: "Amina K.", role: "iPhone 14 · Screen", text: "Fast, honest, and clean work. Tracked it live on my phone. Impressive.", rating: 5 },
  { name: "David M.", role: "MacBook Pro · SSD", text: "Diagnosed a board fault others missed. Saved me a fortune.", rating: 5 },
  { name: "Wanjiku N.", role: "PS5 · HDMI", text: "Back in 24h with a proper warranty. Won't go anywhere else.", rating: 5 },
];

function useLiveReviews() {
  const [live, setLive] = useState<{ name: string; role: string; rating: number; text: string }[]>([]);
  useEffect(() => {
    supabase
      .from("reviews")
      .select("rating, comment, created_at")
      .eq("approved", true)
      .not("comment", "is", null)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) =>
        setLive((data ?? []).map((r) => ({
          name: "Verified customer",
          role: new Date(r.created_at).toLocaleDateString(),
          rating: r.rating,
          text: r.comment as string,
        }))),
      );
  }, []);
  return live;
}

function Landing() {
  const live = useLiveReviews();
  const displayReviews = live.length > 0 ? live : reviews;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-hero" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Now booking · 24h turnaround
            </span>
            <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
              Premium repairs.<br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">Zero drama.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Magnetic Repair fixes your phone, laptop, tablet, and console with certified technicians,
              transparent pricing, and a warranty. Track every step, live.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elegant">
                <Link to="/auth" search={{ mode: "signup" }}>Book a repair <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/track">Track my repair</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" /><Star className="h-4 w-4 fill-primary text-primary" /><Star className="h-4 w-4 fill-primary text-primary" /><Star className="h-4 w-4 fill-primary text-primary" /><Star className="h-4 w-4 fill-primary text-primary" /><span className="ml-1 font-medium text-foreground">4.9</span> · 2,400+ repairs</div>
              <div className="h-4 w-px bg-border" />
              <div>Certified · Warrantied · Insured</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">About us</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">A workshop that treats your device like ours.</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We're a team of board-level trained technicians obsessed with clean, honest work.
              From cracked screens to complex logic-board failures, we diagnose fast, quote fairly,
              and repair with genuine or factory-grade parts — every job backed by our written warranty.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["12k+", "Repairs completed"],
              ["4.9★", "Average rating"],
              ["24h", "Avg. turnaround"],
              ["90 days", "Warranty on repairs"],
            ].map(([n, l]) => (
              <Card key={l} className="shadow-card">
                <CardContent className="p-6">
                  <div className="text-2xl font-semibold">{n}</div>
                  <div className="text-sm text-muted-foreground mt-1">{l}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Services</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Everything we repair.</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">Flat-rate diagnostics. Free quotes. No fix, no fee — on eligible repairs.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <Card key={s.title} className="group shadow-card hover:shadow-elegant transition-shadow">
              <CardContent className="p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-semibold">{s.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="rounded-3xl bg-gradient-primary/10 border border-border p-8 sm:p-12">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary font-semibold">Why choose us</div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Built for people who value their time.</h2>
              <p className="mt-4 text-muted-foreground">Modern workshops should feel modern. Live tracking, digital receipts,
                and honest technicians — no jargon, no surprises.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {why.map((w) => (
                <div key={w.title} className="rounded-xl bg-card p-5 shadow-card">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary"><w.icon className="h-4 w-4" /></div>
                  <div className="mt-3 font-semibold">{w.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Repair Process</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Four simple steps.</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-4 gap-4">
          {process.map((p, i) => (
            <Card key={p.title} className="shadow-card">
              <CardContent className="p-6">
                <div className="text-xs font-mono text-muted-foreground">STEP 0{i + 1}</div>
                <div className="mt-3 grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><p.icon className="h-5 w-5" /></div>
                <div className="mt-4 font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Customer reviews</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Loved by thousands.</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {displayReviews.map((r) => (
            <Card key={r.name + r.text} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex gap-0.5">{Array.from({ length: r.rating }).map((_, i) => (<Star key={i} className="h-4 w-4 fill-primary text-primary" />))}</div>
                <p className="mt-4 text-sm">{r.text}</p>
                <div className="mt-4">
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 sm:px-6 py-16">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">FAQ</div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Common questions.</h2>
        </div>
        <Accordion type="single" collapsible className="mt-8">
          {[
            ["How long does a typical repair take?", "Most phone repairs are done within 24 hours. Complex board-level jobs may take 2–3 days."],
            ["Do you use genuine parts?", "We use genuine or factory-grade parts. We'll always disclose part origin upfront."],
            ["What is your warranty?", "All repairs come with a 90-day warranty covering the specific fix and parts installed."],
            ["Can I track my repair online?", "Yes — every ticket gets a tracking ID with live status updates and technician notes."],
            ["How do I pay?", "M-Pesa, cash, card, or bank transfer. Digital receipts are issued instantly."],
          ].map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* TRACK CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 sm:p-12 shadow-elegant relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center relative">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold">Track your repair in real time.</h2>
              <p className="mt-3 opacity-90 max-w-md">Enter your tracking ID, phone, or receipt number to see live progress from diagnosis to pickup.</p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); const q = (new FormData(e.currentTarget)).get("q"); window.location.href = `/track?q=${encodeURIComponent(String(q ?? ""))}`; }}
              className="flex gap-2 bg-card text-foreground rounded-2xl p-2 shadow-card"
            >
              <div className="flex-1 flex items-center gap-2 px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input name="q" placeholder="MAG-2026-000123 or phone / receipt" className="w-full bg-transparent outline-none text-sm py-3" />
              </div>
              <Button type="submit" className="bg-gradient-primary">Track</Button>
            </form>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Contact</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold">Get in touch.</h2>
            <p className="mt-3 text-muted-foreground">Message us or drop by the workshop.</p>
            <div className="mt-6 grid gap-3 text-sm">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Nairobi katani, Kenya</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Business Reg. *******</div>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Location"
                src="https://www.google.com/maps?q=Nairobi&output=embed"
                className="w-full h-64"
                loading="lazy"
              />
            </div>
          </div>
          <form className="rounded-2xl border border-border p-6 shadow-card space-y-3" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch."); }}>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Your name" required />
              <Input type="email" placeholder="Email" required />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="How can we help?" rows={5} />
            <Button type="submit" className="bg-gradient-primary w-full">Send message</Button>
          </form>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
