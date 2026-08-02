import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, AlertTriangle, Plus, Trash2, ShieldAlert, Boxes, Coins } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — Magnetic Repair" },
      { name: "description", content: "Track spare parts, stock levels and reorder alerts for the Magnetic Repair workshop." },
      { property: "og:title", content: "Inventory — Magnetic Repair" },
      { property: "og:description", content: "Spare parts stock control for the Magnetic Repair workshop." },
    ],
  }),
  component: InventoryPage,
});

interface Part {
  id: string;
  name: string;
  sku: string | null;
  category: string | null;
  quantity: number;
  reorder_level: number;
  cost_price: number;
  sale_price: number;
  supplier: string | null;
}

const partSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  sku: z.string().trim().max(60).optional(),
  category: z.string().trim().max(60).optional(),
  quantity: z.coerce.number().int().min(0).max(100000),
  reorder_level: z.coerce.number().int().min(0).max(10000),
  cost_price: z.coerce.number().min(0).max(10000000),
  sale_price: z.coerce.number().min(0).max(10000000),
  supplier: z.string().trim().max(120).optional(),
});

function InventoryPage() {
  const { roles } = useAuth();
  const canEdit = roles.includes("admin") || roles.includes("technician");
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("inventory_parts").select("*").order("name");
    setParts((data ?? []) as Part[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const addPart = async (form: HTMLFormElement) => {
    const fd = Object.fromEntries(new FormData(form).entries());
    const parsed = partSchema.safeParse(fd);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    const { error } = await supabase.from("inventory_parts").insert(parsed.data);
    if (error) return toast.error(error.message);
    toast.success("Part added");
    setOpen(false);
    form.reset();
    load();
  };

  const adjust = async (p: Part, delta: number) => {
    const quantity = Math.max(0, p.quantity + delta);
    setParts((prev) => prev.map((x) => (x.id === p.id ? { ...x, quantity } : x)));
    const { error } = await supabase.from("inventory_parts").update({ quantity }).eq("id", p.id);
    if (error) { toast.error(error.message); load(); }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("inventory_parts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Part removed");
    load();
  };

  if (!canEdit) {
    return (
      <Card className="shadow-card"><CardContent className="p-10 text-center">
        <ShieldAlert className="h-10 w-10 text-warning mx-auto" />
        <h2 className="mt-3 text-xl font-semibold">Restricted</h2>
        <p className="mt-1 text-sm text-muted-foreground">Inventory is available to technicians and administrators.</p>
      </CardContent></Card>
    );
  }

  const filtered = parts.filter((p) =>
    [p.name, p.sku, p.category, p.supplier].filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase()),
  );
  const lowStock = parts.filter((p) => p.quantity <= p.reorder_level);
  const stockValue = parts.reduce((s, p) => s + p.quantity * Number(p.cost_price || 0), 0);

  const stats = [
    { label: "Distinct parts", value: parts.length, icon: Boxes },
    { label: "Units in stock", value: parts.reduce((s, p) => s + p.quantity, 0), icon: Package },
    { label: "Low stock", value: lowStock.length, icon: AlertTriangle },
    { label: "Stock value", value: `KSh ${stockValue.toLocaleString()}`, icon: Coins },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Workshop</div>
          <h1 className="mt-1 text-3xl font-semibold">Inventory</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="bg-gradient-primary"><Plus className="h-4 w-4 mr-1.5" /> Add part</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New spare part</DialogTitle></DialogHeader>
            <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); addPart(e.currentTarget); }}>
              <Input name="name" placeholder="Part name (e.g. iPhone 12 screen)" required />
              <div className="grid grid-cols-2 gap-3">
                <Input name="sku" placeholder="SKU" />
                <Input name="category" placeholder="Category" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input name="quantity" type="number" min={0} defaultValue={0} placeholder="Quantity" />
                <Input name="reorder_level" type="number" min={0} defaultValue={5} placeholder="Reorder level" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input name="cost_price" type="number" min={0} step="0.01" defaultValue={0} placeholder="Cost price" />
                <Input name="sale_price" type="number" min={0} step="0.01" defaultValue={0} placeholder="Sale price" />
              </div>
              <Input name="supplier" placeholder="Supplier" />
              <Button type="submit" className="bg-gradient-primary">Save part</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-card"><CardContent className="p-5">
            <div className="flex items-center justify-between"><div className="text-xs text-muted-foreground">{s.label}</div><s.icon className="h-4 w-4 text-primary" /></div>
            <div className="mt-3 text-2xl font-semibold">{s.value}</div>
          </CardContent></Card>
        ))}
      </div>

      {lowStock.length > 0 && (
        <Card className="shadow-card border-warning/40">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-sm font-medium"><AlertTriangle className="h-4 w-4 text-warning" /> Reorder soon</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {lowStock.map((p) => (<Badge key={p.id} variant="secondary">{p.name} · {p.quantity} left</Badge>))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="text-lg font-semibold">Parts catalogue</h2>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search parts…" className="max-w-xs" />
          </div>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No parts yet.</div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((p) => (
                <div key={p.id} className="py-4 grid md:grid-cols-5 gap-3 items-center">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{p.sku || "—"}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{p.category || "Uncategorised"}</div>
                  <div className="text-sm">
                    <span className={p.quantity <= p.reorder_level ? "text-warning font-medium" : ""}>{p.quantity} in stock</span>
                    <div className="text-xs text-muted-foreground">reorder at {p.reorder_level}</div>
                  </div>
                  <div className="text-sm">
                    <div>KSh {Number(p.sale_price).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">cost KSh {Number(p.cost_price).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-1.5 justify-end">
                    <Button variant="outline" size="sm" onClick={() => adjust(p, -1)}>−</Button>
                    <Button variant="outline" size="sm" onClick={() => adjust(p, 1)}>+</Button>
                    {roles.includes("admin") && (
                      <Button variant="ghost" size="sm" onClick={() => remove(p.id)} aria-label="Delete part">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
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
