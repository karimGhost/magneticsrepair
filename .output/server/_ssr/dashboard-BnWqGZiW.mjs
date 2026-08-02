import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { K as CircleCheck, M as LoaderCircle, V as DollarSign, W as Clock, r as Wrench, z as FileDown } from "../_libs/lucide-react.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { n as downloadReceipt, t as TicketChat } from "./receipt-DYscX8-s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BnWqGZiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABEL = {
	received: "Received",
	diagnosing: "Diagnosing",
	waiting_parts: "Waiting for Parts",
	repairing: "Repairing",
	testing: "Testing",
	completed: "Completed",
	ready_pickup: "Ready for Pickup",
	collected: "Collected"
};
function CustomerDashboard() {
	const { user } = useAuth();
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		supabase.from("repair_tickets").select("*").eq("customer_id", user.id).order("created_at", { ascending: false }).then(({ data }) => {
			setTickets(data ?? []);
			setLoading(false);
		});
	}, [user]);
	const active = tickets.filter((t) => !["collected", "completed"].includes(t.status));
	const completed = tickets.filter((t) => [
		"collected",
		"completed",
		"ready_pickup"
	].includes(t.status));
	const paid = tickets.reduce((s, t) => s + Number(t.deposit_paid || 0), 0);
	const balance = tickets.reduce((s, t) => s + Math.max(0, Number(t.total_amount || 0) - Number(t.deposit_paid || 0)), 0);
	const stats = [
		{
			label: "Active repairs",
			value: active.length,
			icon: LoaderCircle
		},
		{
			label: "Completed",
			value: completed.length,
			icon: CircleCheck
		},
		{
			label: "Amount paid",
			value: `KSh ${paid.toLocaleString()}`,
			icon: DollarSign
		},
		{
			label: "Balance",
			value: `KSh ${balance.toLocaleString()}`,
			icon: Clock
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-primary font-semibold",
				children: "Welcome back"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-semibold",
				children: "Your repairs"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "shadow-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: s.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-2xl font-semibold",
							children: s.value
						})]
					})
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Repair history"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4 text-muted-foreground" })]
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading…"
					}) : tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-dashed border-border p-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm text-muted-foreground",
							children: "You haven't booked a repair yet."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#services",
							className: "mt-3 inline-block text-sm font-medium text-primary hover:underline",
							children: "Browse services →"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-4 grid md:grid-cols-4 gap-3 items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-mono text-muted-foreground",
										children: t.tracking_id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-medium mt-1",
										children: [
											t.brand,
											" ",
											t.model
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: t.device_type
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground line-clamp-2",
									children: t.problem_reported
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground mb-1",
									children: STATUS_LABEL[t.status]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: t.progress })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 md:justify-end",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											children: ["KSh ", Number(t.total_amount || 0).toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketChat, { ticketId: t.id }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => downloadReceipt(t, user?.email),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4 mr-1.5" }), " Receipt"]
										})
									]
								})
							]
						}, t.id))
					})]
				})
			})
		]
	});
}
//#endregion
export { CustomerDashboard as component };
