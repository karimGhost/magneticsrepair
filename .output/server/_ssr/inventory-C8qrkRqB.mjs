import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Package, U as Coins, X as Boxes, _ as ShieldAlert, c as TriangleAlert, u as Trash2, x as Plus } from "../_libs/lucide-react.mjs";
import { At as objectType, Dt as coerce, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-D85IC6Pl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-C8qrkRqB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var partSchema = objectType({
	name: stringType().trim().min(1, "Name is required").max(120),
	sku: stringType().trim().max(60).optional(),
	category: stringType().trim().max(60).optional(),
	quantity: coerce.number().int().min(0).max(1e5),
	reorder_level: coerce.number().int().min(0).max(1e4),
	cost_price: coerce.number().min(0).max(1e7),
	sale_price: coerce.number().min(0).max(1e7),
	supplier: stringType().trim().max(120).optional()
});
function InventoryPage() {
	const { roles } = useAuth();
	const canEdit = roles.includes("admin") || roles.includes("technician");
	const [parts, setParts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const load = async () => {
		const { data } = await supabase.from("inventory_parts").select("*").order("name");
		setParts(data ?? []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const addPart = async (form) => {
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
	const adjust = async (p, delta) => {
		const quantity = Math.max(0, p.quantity + delta);
		setParts((prev) => prev.map((x) => x.id === p.id ? {
			...x,
			quantity
		} : x));
		const { error } = await supabase.from("inventory_parts").update({ quantity }).eq("id", p.id);
		if (error) {
			toast.error(error.message);
			load();
		}
	};
	const remove = async (id) => {
		const { error } = await supabase.from("inventory_parts").delete().eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Part removed");
		load();
	};
	if (!canEdit) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-10 w-10 text-warning mx-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-semibold",
					children: "Restricted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Inventory is available to technicians and administrators."
				})
			]
		})
	});
	const filtered = parts.filter((p) => [
		p.name,
		p.sku,
		p.category,
		p.supplier
	].filter(Boolean).join(" ").toLowerCase().includes(query.toLowerCase()));
	const lowStock = parts.filter((p) => p.quantity <= p.reorder_level);
	const stockValue = parts.reduce((s, p) => s + p.quantity * Number(p.cost_price || 0), 0);
	const stats = [
		{
			label: "Distinct parts",
			value: parts.length,
			icon: Boxes
		},
		{
			label: "Units in stock",
			value: parts.reduce((s, p) => s + p.quantity, 0),
			icon: Package
		},
		{
			label: "Low stock",
			value: lowStock.length,
			icon: TriangleAlert
		},
		{
			label: "Stock value",
			value: `KSh ${stockValue.toLocaleString()}`,
			icon: Coins
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-primary font-semibold",
					children: "Workshop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-semibold",
					children: "Inventory"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "bg-gradient-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1.5" }), " Add part"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New spare part" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							addPart(e.currentTarget);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "name",
								placeholder: "Part name (e.g. iPhone 12 screen)",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "sku",
									placeholder: "SKU"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "category",
									placeholder: "Category"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "quantity",
									type: "number",
									min: 0,
									defaultValue: 0,
									placeholder: "Quantity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "reorder_level",
									type: "number",
									min: 0,
									defaultValue: 5,
									placeholder: "Reorder level"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "cost_price",
									type: "number",
									min: 0,
									step: "0.01",
									defaultValue: 0,
									placeholder: "Cost price"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "sale_price",
									type: "number",
									min: 0,
									step: "0.01",
									defaultValue: 0,
									placeholder: "Sale price"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "supplier",
								placeholder: "Supplier"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-primary",
								children: "Save part"
							})
						]
					})] })]
				})]
			}),
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
			lowStock.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card border-warning/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-warning" }), " Reorder soon"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: lowStock.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							children: [
								p.name,
								" · ",
								p.quantity,
								" left"
							]
						}, p.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Parts catalogue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search parts…",
							className: "max-w-xs"
						})]
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading…"
					}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
						children: "No parts yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-4 grid md:grid-cols-5 gap-3 items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-mono",
									children: p.sku || "—"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: p.category || "Uncategorised"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: p.quantity <= p.reorder_level ? "text-warning font-medium" : "",
										children: [p.quantity, " in stock"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: ["reorder at ", p.reorder_level]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["KSh ", Number(p.sale_price).toLocaleString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: ["cost KSh ", Number(p.cost_price).toLocaleString()]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 justify-end",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => adjust(p, -1),
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => adjust(p, 1),
											children: "+"
										}),
										roles.includes("admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => remove(p.id),
											"aria-label": "Delete part",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
										})
									]
								})
							]
						}, p.id))
					})]
				})
			})
		]
	});
}
//#endregion
export { InventoryPage as component };
