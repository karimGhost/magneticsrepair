import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as Banknote, F as Landmark, H as CreditCard, _ as ShieldAlert, a as Wallet, h as Smartphone, x as Plus } from "../_libs/lucide-react.mjs";
import { At as objectType, Dt as coerce, Ot as enumType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-D85IC6Pl.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-ChDRw9rj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var METHOD_META = {
	mpesa: {
		label: "M-Pesa",
		icon: Smartphone
	},
	cash: {
		label: "Cash",
		icon: Banknote
	},
	card: {
		label: "Card",
		icon: CreditCard
	},
	bank: {
		label: "Bank transfer",
		icon: Landmark
	}
};
var paymentSchema = objectType({
	ticket_id: stringType().uuid("Select a repair"),
	amount: coerce.number().positive("Amount must be greater than zero").max(1e7),
	method: enumType([
		"mpesa",
		"cash",
		"card",
		"bank"
	]),
	reference: stringType().trim().max(80).optional()
});
function PaymentsPage() {
	const { user, roles } = useAuth();
	const staff = roles.includes("admin") || roles.includes("technician");
	const [payments, setPayments] = (0, import_react.useState)([]);
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [ticketId, setTicketId] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("mpesa");
	const load = async () => {
		const [{ data: pay }, { data: tk }] = await Promise.all([supabase.from("payments").select("*").order("created_at", { ascending: false }), supabase.from("repair_tickets").select("id,tracking_id,brand,model,total_amount,deposit_paid").order("created_at", { ascending: false })]);
		setPayments(pay ?? []);
		setTickets(tk ?? []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		load();
	}, [user]);
	const record = async (form) => {
		const fd = Object.fromEntries(new FormData(form).entries());
		const parsed = paymentSchema.safeParse({
			...fd,
			ticket_id: ticketId,
			method
		});
		if (!parsed.success) return toast.error(parsed.error.issues[0].message);
		const { error } = await supabase.from("payments").insert({
			...parsed.data,
			recorded_by: user.id
		});
		if (error) return toast.error(error.message);
		const ticket = tickets.find((t) => t.id === parsed.data.ticket_id);
		if (ticket) await supabase.from("repair_tickets").update({ deposit_paid: Number(ticket.deposit_paid || 0) + parsed.data.amount }).eq("id", ticket.id);
		toast.success("Payment recorded");
		setOpen(false);
		form.reset();
		load();
	};
	const total = payments.filter((p) => p.status === "confirmed").reduce((s, p) => s + Number(p.amount || 0), 0);
	const byMethod = (m) => payments.filter((p) => p.method === m).reduce((s, p) => s + Number(p.amount || 0), 0);
	const ticketLabel = (id) => {
		const t = tickets.find((x) => x.id === id);
		return t ? `${t.tracking_id} · ${t.brand ?? ""} ${t.model ?? ""}`.trim() : "Repair";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-primary font-semibold",
					children: "Finance"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-semibold",
					children: "Payments"
				})] }), staff && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "bg-gradient-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1.5" }), " Record payment"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Record a payment" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							record(e.currentTarget);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: ticketId,
								onValueChange: setTicketId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select repair" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: method,
								onValueChange: (v) => setMethod(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(METHOD_META).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: m,
									children: METHOD_META[m].label
								}, m)) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "amount",
								type: "number",
								min: 1,
								step: "0.01",
								placeholder: "Amount (KSh)",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "reference",
								placeholder: "Reference / M-Pesa code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-primary",
								children: "Save payment"
							})
						]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 lg:grid-cols-5 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Collected"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-2xl font-semibold",
							children: ["KSh ", total.toLocaleString()]
						})]
					})
				}), Object.keys(METHOD_META).map((m) => {
					const Icon = METHOD_META[m].icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: METHOD_META[m].label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 text-xl font-semibold",
								children: ["KSh ", byMethod(m).toLocaleString()]
							})]
						})
					}, m);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold mb-4",
						children: "Payment ledger"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading…"
					}) : payments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
						children: staff ? "No payments recorded yet." : "No payments on your repairs yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: payments.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-4 grid md:grid-cols-4 gap-3 items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: ticketLabel(p.ticket_id)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: new Date(p.created_at).toLocaleString()
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "justify-self-start",
									children: METHOD_META[p.method]?.label ?? p.method
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-mono text-muted-foreground",
									children: p.reference || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:text-right font-semibold",
									children: ["KSh ", Number(p.amount).toLocaleString()]
								})
							]
						}, p.id))
					})]
				})
			}),
			!staff && payments.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-3.5 w-3.5" }), " You only see payments linked to your own repairs."]
			})
		]
	});
}
//#endregion
export { PaymentsPage as component };
