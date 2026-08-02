import { Link } from "@tanstack/react-router";
import { Moon, Sun, Wrench } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, roles } = useAuth();
  const dest = roles.includes("admin") ? "/admin" : roles.includes("technician") ? "/technician" : "/dashboard";

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mt-3 flex items-center justify-between rounded-2xl glass shadow-card px-4 py-2.5">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
              <Wrench className="h-4 w-4" />
            </span>
            <span className="tracking-tight">Magnetic<span className="text-primary">Repair</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="/#services" className="hover:text-foreground transition">Services</a>
            <a href="/#process" className="hover:text-foreground transition">Process</a>
            <a href="/#reviews" className="hover:text-foreground transition">Reviews</a>
            <a href="/#faq" className="hover:text-foreground transition">FAQ</a>
            <Link to="/track" className="hover:text-foreground transition">Track</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-accent transition">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {user ? (
              <Button asChild size="sm"><Link to={dest}>Dashboard</Link></Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/auth">Sign in</Link></Button>
                <Button asChild size="sm" className="bg-gradient-primary shadow-elegant"><Link to="/book">Book Repair</Link></Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
