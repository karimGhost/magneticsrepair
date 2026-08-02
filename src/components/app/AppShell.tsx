import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMemo, type ReactNode } from "react";
import {
  LayoutDashboard, Wrench, LogOut, Moon, Sun, Search, ShieldCheck, Package, CreditCard, Star,
} from "lucide-react";
import { NotificationsBell } from "@/components/app/NotificationsBell";
import { AiAssistant } from "@/components/app/AiAssistant";
import { useAuth } from "@/lib/auth-context";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: ReactNode }) {
  const { user, roles, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav_items = useMemo(() => {
    const items = [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/book", label: "Book repair", icon: Wrench },
    ];
    if (roles.includes("technician") || roles.includes("admin"))

      items.push({ to: "/technician", label: "Repairs", icon: Wrench });
    if (roles.includes("technician") || roles.includes("admin"))
      items.push({ to: "/inventory", label: "Inventory", icon: Package });
    items.push({ to: "/payments", label: "Payments", icon: CreditCard });
    items.push({ to: "/reviews", label: "Reviews", icon: Star });
    if (roles.includes("admin"))
      items.push({ to: "/admin", label: "Admin", icon: ShieldCheck });
    return items;
  }, [roles]);

  const handleSignOut = async () => { await signOut(); nav({ to: "/", replace: true }); };
  const initials = (user?.email ?? "?").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border/60 bg-card/50 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 px-5 h-16 font-semibold border-b border-border/60">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
            <Wrench className="h-4 w-4" />
          </span>
          <span>Magnetic<span className="text-primary">Repair</span></span>
        </Link>
        <nav className="flex-1 p-3 space-y-1">
          {nav_items.map((n) => {
            const active = pathname === n.to || pathname.startsWith(n.to + "/");
            return (
              <Link key={n.to + n.label} to={n.to} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"}`}>
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border/60">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold">{initials}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.email}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{roles.join(" · ") || "customer"}</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="mt-1 w-full justify-start text-muted-foreground">
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 border-b border-border/60 flex items-center gap-3 px-4 sm:px-6">
          <div className="flex-1 flex items-center gap-2 max-w-md rounded-lg border border-border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search repairs, customers…" className="bg-transparent outline-none text-sm w-full" />
          </div>
          <button onClick={toggle} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent transition" aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <NotificationsBell />
        </header>
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
        <AiAssistant />
      </div>
    </div>
  );
}
