import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { G as ClipboardList, K as CircleCheck, M as LoaderCircle, _ as ShieldAlert, b as Receipt, l as TrendingUp, r as Wrench, x as Plus, z as FileDown } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-D85IC6Pl.mjs";
import { n as downloadReceipt, t as TicketChat } from "./receipt-DYscX8-s.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DxHg2FK2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/technician-CAHKq-bZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Resolves customer + technician display names for a ticket (best effort — RLS may hide some). */
async function fetchTicketNames(ticket) {
	const ids = [ticket.customer_id, ticket.technician_id].filter((v) => !!v);
	if (ids.length === 0) return {};
	const { data } = await supabase.from("profiles").select("id, full_name, phone").in("id", ids);
	const find = (id) => {
		if (!id) return null;
		const p = data?.find((row) => row.id === id);
		return p?.full_name || p?.phone || null;
	};
	return {
		customerName: find(ticket.customer_id),
		technicianName: find(ticket.technician_id)
	};
}
function ReceiptButton({ ticket, fallbackCustomerName, label = "Receipt", showLabel = true }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const onClick = async () => {
		setBusy(true);
		try {
			const names = await fetchTicketNames(ticket);
			await downloadReceipt(ticket, {
				customerName: names.customerName || fallbackCustomerName || null,
				technicianName: names.technicianName || null
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not generate the receipt.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		size: "sm",
		onClick,
		disabled: busy,
		"aria-label": "Download receipt",
		children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-4 w-4" }), showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-1.5",
			children: label
		})]
	});
}
var DEVICE_TYPES = [
	"Phone",
	"Laptop",
	"Tablet",
	"TV",
	"Console",
	"Other"
];
function NewTicketDialog({ onCreated }) {
	const { user } = useAuth();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		customer_id: "",
		device_type: "Phone",
		brand: "",
		model: "",
		serial_number: "",
		problem_reported: "",
		estimated_cost: "",
		labour_cost: "",
		deposit_paid: "",
		assign_me: true
	});
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	(0, import_react.useEffect)(() => {
		if (!open) return;
		supabase.from("profiles").select("id, full_name, phone").order("created_at", { ascending: false }).limit(200).then(({ data, error }) => {
			if (error) return toast.error(error.message);
			setCustomers(data ?? []);
		});
	}, [open]);
	const submit = async (e) => {
		e.preventDefault();
		if (!user) return;
		if (!form.customer_id) return toast.error("Select the customer this repair belongs to.");
		if (!form.problem_reported.trim()) return toast.error("Describe the reported problem.");
		setBusy(true);
		const estimated = Number(form.estimated_cost || 0);
		const labour = Number(form.labour_cost || 0);
		const deposit = Number(form.deposit_paid || 0);
		const { data, error } = await supabase.from("repair_tickets").insert({
			customer_id: form.customer_id,
			technician_id: form.assign_me ? user.id : null,
			device_type: form.device_type,
			brand: form.brand || null,
			model: form.model || null,
			serial_number: form.serial_number || null,
			problem_reported: form.problem_reported,
			estimated_cost: estimated,
			labour_cost: labour,
			deposit_paid: deposit,
			total_amount: estimated + labour
		}).select("id, tracking_id").single();
		if (error) {
			setBusy(false);
			return toast.error(error.message);
		}
		await supabase.from("repair_updates").insert({
			ticket_id: data.id,
			author_id: user.id,
			status: "received",
			note: "Ticket created at the workshop"
		});
		await supabase.from("notifications").insert({
			user_id: form.customer_id,
			title: "Repair ticket created",
			body: `Your repair ${data.tracking_id} has been logged at Magnetic Repair.`
		});
		setBusy(false);
		setOpen(false);
		setForm((f) => ({
			...f,
			problem_reported: "",
			brand: "",
			model: "",
			serial_number: "",
			estimated_cost: "",
			labour_cost: "",
			deposit_paid: ""
		}));
		toast.success(`Ticket ${data.tracking_id} created`);
		onCreated?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "bg-gradient-primary shadow-elegant",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1.5" }), " New repair ticket"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg max-h-[90vh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "New repair ticket" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Customer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.customer_id,
							onValueChange: (v) => set("customer_id", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select a customer" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c.id,
								children: c.full_name || c.phone || c.id.slice(0, 8)
							}, c.id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid sm:grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Device type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.device_type,
									onValueChange: (v) => set("device_type", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEVICE_TYPES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: d,
										children: d
									}, d)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "nt-brand",
									children: "Brand"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "nt-brand",
									value: form.brand,
									onChange: (e) => set("brand", e.target.value),
									placeholder: "Apple, Samsung…"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "nt-model",
									children: "Model"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "nt-model",
									value: form.model,
									onChange: (e) => set("model", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "nt-serial",
									children: "Serial / IMEI"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "nt-serial",
									value: form.serial_number,
									onChange: (e) => set("serial_number", e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "nt-problem",
							children: "Reported problem"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "nt-problem",
							rows: 3,
							value: form.problem_reported,
							onChange: (e) => set("problem_reported", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "nt-est",
									children: "Estimated (KSh)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "nt-est",
									type: "number",
									min: "0",
									value: form.estimated_cost,
									onChange: (e) => set("estimated_cost", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "nt-lab",
									children: "Labour (KSh)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "nt-lab",
									type: "number",
									min: "0",
									value: form.labour_cost,
									onChange: (e) => set("labour_cost", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "nt-dep",
									children: "Deposit (KSh)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "nt-dep",
									type: "number",
									min: "0",
									value: form.deposit_paid,
									onChange: (e) => set("deposit_paid", e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.assign_me,
							onChange: (e) => set("assign_me", e.target.checked),
							className: "accent-primary"
						}), "Assign this repair to me"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: busy,
						className: "bg-gradient-primary",
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : null, "Create ticket"]
					}) })
				]
			})]
		})]
	});
}
function EditAmountsDialog({ ticket, onSaved }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [estimated, setEstimated] = (0, import_react.useState)(String(ticket.estimated_cost ?? 0));
	const [labour, setLabour] = (0, import_react.useState)(String(ticket.labour_cost ?? 0));
	const [deposit, setDeposit] = (0, import_react.useState)(String(ticket.deposit_paid ?? 0));
	const total = Number(estimated || 0) + Number(labour || 0);
	const balance = Math.max(0, total - Number(deposit || 0));
	const save = async () => {
		setBusy(true);
		const { error } = await supabase.from("repair_tickets").update({
			estimated_cost: Number(estimated || 0),
			labour_cost: Number(labour || 0),
			deposit_paid: Number(deposit || 0),
			total_amount: total
		}).eq("id", ticket.id);
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success("Amounts updated");
		setOpen(false);
		onSaved?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				"aria-label": "Edit amounts",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Amounts · ", ticket.tracking_id] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: `est-${ticket.id}`,
								children: "Estimated cost (KSh)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: `est-${ticket.id}`,
								type: "number",
								min: "0",
								value: estimated,
								onChange: (e) => setEstimated(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: `lab-${ticket.id}`,
								children: "Labour (KSh)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: `lab-${ticket.id}`,
								type: "number",
								min: "0",
								value: labour,
								onChange: (e) => setLabour(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: `dep-${ticket.id}`,
								children: "Deposit paid (KSh)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: `dep-${ticket.id}`,
								type: "number",
								min: "0",
								value: deposit,
								onChange: (e) => setDeposit(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-accent/40 p-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: ["KSh ", total.toLocaleString()]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Balance due"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: ["KSh ", balance.toLocaleString()]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: save,
					disabled: busy,
					className: "bg-gradient-primary",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : null, "Save"]
				}) })
			]
		})]
	});
}
var STAGES = [
	"received",
	"diagnosing",
	"waiting_parts",
	"repairing",
	"testing",
	"completed",
	"ready_pickup",
	"collected"
];
var LABEL = {
	received: "Received",
	diagnosing: "Diagnosing",
	waiting_parts: "Waiting for Parts",
	repairing: "Repairing",
	testing: "Testing",
	completed: "Completed",
	ready_pickup: "Ready for Pickup",
	collected: "Collected"
};
var PROGRESS = {
	received: 10,
	diagnosing: 25,
	waiting_parts: 40,
	repairing: 60,
	testing: 80,
	completed: 90,
	ready_pickup: 95,
	collected: 100
};
function TechPage() {
	const { user, roles } = useAuth();
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = async () => {
		if (!user) return;
		let q = supabase.from("repair_tickets").select("*").order("created_at", { ascending: false });
		if (!roles.includes("admin")) q = q.eq("technician_id", user.id);
		const { data } = await q;
		setTickets(data ?? []);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		load();
	}, [user, roles]);
	if (!roles.includes("technician") && !roles.includes("admin")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "shadow-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-10 w-10 text-warning mx-auto" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-xl font-semibold",
					children: "Awaiting approval"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Your technician account is pending administrator approval."
				})
			]
		})
	});
	const updateStatus = async (id, status) => {
		const s = status;
		const { error } = await supabase.from("repair_tickets").update({
			status: s,
			progress: PROGRESS[status] ?? 0
		}).eq("id", id);
		if (error) return toast.error(error.message);
		await supabase.from("repair_updates").insert({
			ticket_id: id,
			author_id: user.id,
			status: s,
			note: `Status updated to ${LABEL[status]}`
		});
		toast.success("Status updated");
		load();
	};
	const stats = [
		{
			label: "Assigned",
			value: tickets.length,
			icon: ClipboardList
		},
		{
			label: "In progress",
			value: tickets.filter((t) => [
				"diagnosing",
				"repairing",
				"testing",
				"waiting_parts"
			].includes(t.status)).length,
			icon: Wrench
		},
		{
			label: "Completed",
			value: tickets.filter((t) => [
				"completed",
				"ready_pickup",
				"collected"
			].includes(t.status)).length,
			icon: CircleCheck
		},
		{
			label: "This month",
			value: tickets.filter((t) => new Date(t.created_at).getMonth() === (/* @__PURE__ */ new Date()).getMonth()).length,
			icon: TrendingUp
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-primary font-semibold",
					children: "Technician"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-semibold",
					children: "Workbench"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewTicketDialog, { onCreated: load })]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold mb-4",
						children: "Assigned repairs"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading…"
					}) : tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground",
						children: "No repairs assigned yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: tickets.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-4 grid md:grid-cols-5 gap-3 items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-mono text-muted-foreground",
									children: t.tracking_id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-medium mt-1",
									children: [
										t.brand,
										" ",
										t.model
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground line-clamp-2",
									children: t.problem_reported
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: t.progress }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground mt-1",
										children: LABEL[t.status]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: t.status,
									onValueChange: (v) => updateStatus(t.id, v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: s,
										children: LABEL[s]
									}, s)) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 md:justify-end",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											variant: "secondary",
											children: ["KSh ", Number(t.total_amount || 0).toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketChat, { ticketId: t.id }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditAmountsDialog, {
											ticket: t,
											onSaved: load
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptButton, {
											ticket: t,
											showLabel: false
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
export { TechPage as component };
