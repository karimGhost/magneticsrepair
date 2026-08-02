import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wrench, Loader2 } from "lucide-react";

const searchSchema = z.object({ mode: z.enum(["signin", "signup"]).optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Sign in — Magnetic Repair" }, { name: "description", content: "Sign in or create an account with Magnetic Repair." }] }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user, roles, loading } = useAuth();
  const [tab, setTab] = useState<"signin" | "signup">(search.mode === "signup" ? "signup" : "signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const dest = roles.includes("admin") ? "/admin" : roles.includes("technician") ? "/technician" : "/dashboard";
      navigate({ to: dest, replace: true });
    }
  }, [user, roles, loading, navigate]);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: String(fd.get("email")), password: String(fd.get("password")) });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Welcome back!");
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: String(fd.get("email")),
      password: String(fd.get("password")),
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name: String(fd.get("full_name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          role: String(fd.get("role") ?? "customer"),
        },
      },
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Account created!");
  };

  const google = async () => {
    setBusy(true);
const { error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/dashboard`,
  },
});

if (error) {
  toast.error(error.message);
}    setBusy(false);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-hero">
      <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 backdrop-blur"><Wrench className="h-4 w-4" /></span>
          <span>MagneticRepair</span>
        </Link>
        <div>
          <h2 className="text-4xl font-semibold leading-tight">Repairs that respect<br />your time.</h2>
          <p className="mt-4 opacity-90 max-w-sm">Book, track, and chat with your technician — all in one place. 24-hour turnaround on most repairs.</p>
        </div>
        <div className="text-sm opacity-80">© {new Date().getFullYear()} Magnetic Repair</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">Welcome</div>
            <h1 className="mt-1 text-2xl font-semibold">Sign in to Magnetic Repair</h1>
          </div>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <form onSubmit={signIn} className="space-y-3">
                <div><Label htmlFor="e1">Email</Label><Input id="e1" name="email" type="email" required autoComplete="email" /></div>
                <div><Label htmlFor="p1">Password</Label><Input id="p1" name="password" type="password" required autoComplete="current-password" /></div>
                <Button disabled={busy} className="w-full bg-gradient-primary">{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Sign in</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={signUp} className="space-y-3">
                <div><Label htmlFor="fn">Full name</Label><Input id="fn" name="full_name" required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label htmlFor="e2">Email</Label><Input id="e2" name="email" type="email" required autoComplete="email" /></div>
                  <div><Label htmlFor="ph">Phone</Label><Input id="ph" name="phone" required /></div>
                </div>
                <div><Label htmlFor="p2">Password</Label><Input id="p2" name="password" type="password" required minLength={8} autoComplete="new-password" /></div>
                <div>
                  <Label>Account type</Label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 rounded-lg border border-border p-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-accent">
                      <input type="radio" name="role" value="customer" defaultChecked className="accent-primary" />
                      <span className="text-sm">Customer</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-lg border border-border p-3 cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-accent">
                      <input type="radio" name="role" value="technician" className="accent-primary" />
                      <span className="text-sm">Technician</span>
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Technician accounts require admin approval.</p>
                </div>
                <Button disabled={busy} className="w-full bg-gradient-primary">{busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create account</Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
          </div>
          <Button variant="outline" className="w-full" onClick={google} disabled={busy}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1H12v3.8h5.35c-.23 1.2-1.53 3.5-5.35 3.5c-3.22 0-5.85-2.66-5.85-5.9s2.63-5.9 5.85-5.9c1.83 0 3.05.78 3.75 1.45l2.55-2.45C16.85 4.05 14.65 3 12 3C6.98 3 3 6.98 3 12s3.98 9 9 9c5.2 0 8.65-3.65 8.65-8.8c0-.6-.05-1.05-.13-1.5Z" /></svg>
            Continue with Google
          </Button>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
