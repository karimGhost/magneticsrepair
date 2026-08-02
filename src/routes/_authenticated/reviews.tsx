import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Magnetic Repair" },
      { name: "description", content: "Rate your completed repair and read what other Magnetic Repair customers say." },
      { property: "og:title", content: "Reviews — Magnetic Repair" },
      { property: "og:description", content: "Customer ratings and feedback for Magnetic Repair." },
    ],
  }),
  component: ReviewsPage,
});

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional(),
});

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={onChange ? "transition hover:scale-110" : "cursor-default"}
        >
          <Star className={`h-5 w-5 ${n <= value ? "fill-primary text-primary" : "text-muted-foreground"}`} />
        </button>
      ))}
    </div>
  );
}

function ReviewsPage() {
  const { user, roles } = useAuth();
  const isAdmin = roles.includes("admin");
  const [reviews, setReviews] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticketId, setTicketId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [{ data: rv }, { data: tk }] = await Promise.all([
      supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      supabase
        .from("repair_tickets")
        .select("id,tracking_id,brand,model,status")
        .eq("customer_id", user?.id ?? "")
        .in("status", ["completed", "ready_pickup", "collected"]),
    ]);
    setReviews(rv ?? []);
    setTickets(tk ?? []);
    setLoading(false);
  };
  useEffect(() => { if (user) load(); }, [user]);

  const submit = async () => {
    const parsed = reviewSchema.safeParse({ rating, comment: comment || undefined });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    const { error } = await supabase.from("reviews").insert({
      customer_id: user!.id,
      ticket_id: ticketId || null,
      rating: parsed.data.rating,
      comment: parsed.data.comment ?? null,
    });
    if (error) return toast.error(error.message);
    toast.success("Thanks for your feedback!");
    setComment(""); setRating(5); setTicketId("");
    load();
  };

  const reply = async (id: string, text: string) => {
    const { error } = await supabase.from("reviews").update({ reply: text }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Reply posted");
    load();
  };

  const toggleApproved = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs uppercase tracking-widest text-primary font-semibold">Feedback</div>
        <h1 className="mt-1 text-3xl font-semibold">Reviews</h1>
        {reviews.length > 0 && (
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Stars value={Math.round(avg)} /> {avg.toFixed(1)} from {reviews.length} review{reviews.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Leave a review</h2>
          {tickets.length > 0 && (
            <Select value={ticketId} onValueChange={setTicketId}>
              <SelectTrigger className="max-w-sm"><SelectValue placeholder="Which repair? (optional)" /></SelectTrigger>
              <SelectContent>
                {tickets.map((t) => (<SelectItem key={t.id} value={t.id}>{t.tracking_id} · {t.brand} {t.model}</SelectItem>))}
              </SelectContent>
            </Select>
          )}
          <Stars value={rating} onChange={setRating} />
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={1000} placeholder="Tell us how your repair went…" />
          <Button className="bg-gradient-primary" onClick={submit}>Publish review</Button>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">What customers say</h2>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No reviews yet.</div>
          ) : (
            <div className="space-y-5">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Stars value={r.rating} />
                    <div className="flex items-center gap-2">
                      {!r.approved && <Badge variant="secondary">Hidden</Badge>}
                      <span className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {r.comment && <p className="mt-2 text-sm">{r.comment}</p>}
                  {r.reply && (
                    <div className="mt-3 rounded-lg bg-muted p-3 text-sm">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-primary"><MessageSquareQuote className="h-3.5 w-3.5" /> Magnetic Repair</div>
                      <p className="mt-1">{r.reply}</p>
                    </div>
                  )}
                  {isAdmin && (
                    <form
                      className="mt-3 flex flex-wrap gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem("reply") as HTMLInputElement;
                        if (input.value.trim()) reply(r.id, input.value.trim().slice(0, 1000));
                      }}
                    >
                      <input name="reply" defaultValue={r.reply ?? ""} placeholder="Reply as the shop…" maxLength={1000}
                        className="flex-1 min-w-48 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                      <Button size="sm" type="submit" variant="outline">Reply</Button>
                      <Button size="sm" type="button" variant="ghost" onClick={() => toggleApproved(r.id, !r.approved)}>
                        {r.approved ? "Hide" : "Publish"}
                      </Button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
