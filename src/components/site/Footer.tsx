import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="text-lg font-semibold tracking-tight">Magnetic<span className="text-primary">Repair</span></div>
          <p className="mt-3 text-sm text-muted-foreground">Trusted device repair workshop. Same-day service, transparent pricing, warrantied fixes.</p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="hover:text-primary"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-primary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-primary"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5" /> +254703756305/0729222166</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5" /> hello@magneticrepair.co</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5" /> Nairobi, Kenya</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="/#about" className="hover:text-foreground">About</a></li>
                        <li><a href="/Privacy-policy" className="hover:text-foreground">privacy-Policy</a></li>
            <li><a href="/Terms" className="hover:text-foreground">Terms</a></li>

            <li><a href="/#services" className="hover:text-foreground">Services</a></li>
            <li><a href="/#faq" className="hover:text-foreground">FAQ</a></li>
            <li><a href="/track" className="hover:text-foreground">Track Repair</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium">Hours</div>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>Mon – Fri · 9:00 – 19:00</li>
            <li>Saturday · 10:00 – 17:00</li>
            <li>Sunday · Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} Magnetic Repair. All rights reserved.</p>
          <p>Made with care by karim.</p>
        </div>
      </div>
    </footer>
  );
}
