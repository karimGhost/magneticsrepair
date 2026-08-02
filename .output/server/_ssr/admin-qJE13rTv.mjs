import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { K as CircleCheck, _ as ShieldAlert, l as TrendingUp, o as Users, r as Wrench } from "../_libs/lucide-react.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-qJE13rTv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const { roles, user } = useAuth();
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [pendingTechs, setPendingTechs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = async () => {
		const [{ data: t }, { data: p }] = await Promise.all([supabase.from("repair_tickets").select("*"), supabase.from("profiles").select("id, full_name, phone, tech_status").eq("tech_status", "pending")]);
		setTickets(t ?? []);
		setPendingTechs(p ?? []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const bootstrapAdmin = async () => {
		if (!user) return;
		const { data, error } = await supabase.rpc("bootstrap_admin");
		if (error) return toast.error(error.message);
		if (!data) return toast.error("An administrator already exists.");
		toast.success("You're now an admin. Reloading…");
		setTimeout(() => window.location.reload(), 700);
	};
	if (!roles.includes("admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-10 w-10 text-warning mx-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-semibold",
					children: "Admin access required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "You don't have administrator permissions."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: bootstrapAdmin,
					className: "mt-4 bg-gradient-primary",
					children: "Claim admin (first-run only)"
				})
			]
		})
	});
	const approve = async (uid, approve) => {
		const status = approve ? "approved" : "rejected";
		const { error } = await supabase.from("profiles").update({ tech_status: status }).eq("id", uid);
		if (error) return toast.error(error.message);
		if (approve) {
			await supabase.from("user_roles").delete().eq("user_id", uid);
			await supabase.from("user_roles").insert({
				user_id: uid,
				role: "technician"
			});
		}
		toast.success(approve ? "Technician approved" : "Rejected");
		load();
	};
	const revenue = tickets.reduce((s, t) => s + Number(t.total_amount || 0), 0);
	const now = /* @__PURE__ */ new Date();
	const months = Array.from({ length: 6 }).map((_, i) => {
		const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
		const key = d.toLocaleString(void 0, { month: "short" });
		const r = tickets.filter((t) => {
			const td = new Date(t.created_at);
			return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
		});
		return {
			month: key,
			repairs: r.length,
			revenue: r.reduce((s, x) => s + Number(x.total_amount || 0), 0)
		};
	});
	const stats = [
		{
			label: "Total revenue",
			value: `KSh ${revenue.toLocaleString()}`,
			icon: TrendingUp
		},
		{
			label: "Repairs",
			value: tickets.length,
			icon: Wrench
		},
		{
			label: "Completed",
			value: tickets.filter((t) => [
				"completed",
				"collected",
				"ready_pickup"
			].includes(t.status)).length,
			icon: CircleCheck
		},
		{
			label: "Pending techs",
			value: pendingTechs.length,
			icon: Users
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-primary font-semibold",
				children: "Administrator"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-semibold",
				children: "Control center"
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Revenue · last 6 months"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-72",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: months,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "g",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--primary)",
											stopOpacity: .4
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--primary)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--border)",
										strokeDasharray: "3 3",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "month",
										stroke: "var(--muted-foreground)",
										fontSize: 12
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--muted-foreground)",
										fontSize: 12
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--card)",
										border: "1px solid var(--border)",
										borderRadius: 8
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "revenue",
										stroke: "var(--primary)",
										strokeWidth: 2,
										fill: "url(#g)"
									})
								]
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold mb-4",
						children: "Pending technician approvals"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading…"
					}) : pendingTechs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No pending approvals."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: pendingTechs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: p.full_name || "Unnamed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: p.phone
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "sm",
									onClick: () => approve(p.id, false),
									children: "Reject"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "bg-gradient-primary",
									onClick: () => approve(p.id, true),
									children: "Approve"
								})]
							})]
						}, p.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold mb-4",
						children: "Recent tickets"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border",
						children: [tickets.slice(0, 8).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-3 flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-mono text-muted-foreground",
								children: t.tracking_id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium",
								children: [
									t.brand,
									" ",
									t.model,
									" — ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground font-normal",
										children: t.problem_reported
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: t.status
							})]
						}, t.id)), tickets.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-sm text-muted-foreground",
							children: "No tickets yet."
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { AdminPage as component };
