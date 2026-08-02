import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as MessageSquareQuote, p as Star } from "../_libs/lucide-react.mjs";
import { At as objectType, jt as stringType, kt as numberType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews-Bs6QQa9J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var reviewSchema = objectType({
	rating: numberType().int().min(1).max(5),
	comment: stringType().trim().max(1e3).optional()
});
function Stars({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-0.5",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: !onChange,
			onClick: () => onChange?.(n),
			"aria-label": `${n} star${n > 1 ? "s" : ""}`,
			className: onChange ? "transition hover:scale-110" : "cursor-default",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-5 w-5 ${n <= value ? "fill-primary text-primary" : "text-muted-foreground"}` })
		}, n))
	});
}
function ReviewsPage() {
	const { user, roles } = useAuth();
	const isAdmin = roles.includes("admin");
	const [reviews, setReviews] = (0, import_react.useState)([]);
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [ticketId, setTicketId] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(5);
	const [comment, setComment] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = async () => {
		const [{ data: rv }, { data: tk }] = await Promise.all([supabase.from("reviews").select("*").order("created_at", { ascending: false }), supabase.from("repair_tickets").select("id,tracking_id,brand,model,status").eq("customer_id", user?.id ?? "").in("status", [
			"completed",
			"ready_pickup",
			"collected"
		])]);
		setReviews(rv ?? []);
		setTickets(tk ?? []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		if (user) load();
	}, [user]);
	const submit = async () => {
		const parsed = reviewSchema.safeParse({
			rating,
			comment: comment || void 0
		});
		if (!parsed.success) return toast.error(parsed.error.issues[0].message);
		const { error } = await supabase.from("reviews").insert({
			customer_id: user.id,
			ticket_id: ticketId || null,
			rating: parsed.data.rating,
			comment: parsed.data.comment ?? null
		});
		if (error) return toast.error(error.message);
		toast.success("Thanks for your feedback!");
		setComment("");
		setRating(5);
		setTicketId("");
		load();
	};
	const reply = async (id, text) => {
		const { error } = await supabase.from("reviews").update({ reply: text }).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Reply posted");
		load();
	};
	const toggleApproved = async (id, approved) => {
		const { error } = await supabase.from("reviews").update({ approved }).eq("id", id);
		if (error) return toast.error(error.message);
		load();
	};
	const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-primary font-semibold",
					children: "Feedback"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-semibold",
					children: "Reviews"
				}),
				reviews.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: Math.round(avg) }),
						" ",
						avg.toFixed(1),
						" from ",
						reviews.length,
						" review",
						reviews.length > 1 ? "s" : ""
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Leave a review"
						}),
						tickets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: ticketId,
							onValueChange: setTicketId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "max-w-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Which repair? (optional)" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: t.id,
								children: [
									t.tracking_id,
									" · ",
									t.brand,
									" ",
									t.model
								]
							}, t.id)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
							value: rating,
							onChange: setRating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: comment,
							onChange: (e) => setComment(e.target.value),
							maxLength: 1e3,
							placeholder: "Tell us how your repair went…"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "bg-gradient-primary",
							onClick: submit,
							children: "Publish review"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold mb-4",
						children: "What customers say"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading…"
					}) : reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
						children: "No reviews yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-5",
						children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: r.rating }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [!r.approved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: "Hidden"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: new Date(r.created_at).toLocaleDateString()
										})]
									})]
								}),
								r.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: r.comment
								}),
								r.reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 rounded-lg bg-muted p-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs font-medium text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareQuote, { className: "h-3.5 w-3.5" }), " Magnetic Repair"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1",
										children: r.reply
									})]
								}),
								isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "mt-3 flex flex-wrap gap-2",
									onSubmit: (e) => {
										e.preventDefault();
										const input = e.currentTarget.elements.namedItem("reply");
										if (input.value.trim()) reply(r.id, input.value.trim().slice(0, 1e3));
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											name: "reply",
											defaultValue: r.reply ?? "",
											placeholder: "Reply as the shop…",
											maxLength: 1e3,
											className: "flex-1 min-w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											type: "submit",
											variant: "outline",
											children: "Reply"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											type: "button",
											variant: "ghost",
											onClick: () => toggleApproved(r.id, !r.approved),
											children: r.approved ? "Hide" : "Publish"
										})
									]
								})
							]
						}, r.id))
					})]
				})
			})
		]
	});
}
//#endregion
export { ReviewsPage as component };
