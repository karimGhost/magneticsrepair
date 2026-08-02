import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { M as LoaderCircle, m as Sparkles, r as Wrench } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Label } from "./label-AutfcB-T.mjs";
import { n as useServerFn, t as askAssistant } from "./assistant.functions-CHurcDWA.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-CtXQlrtC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var device_types = [
	"Phone",
	"Laptop",
	"Tablet",
	"TV",
	"Console",
	"Other"
];
function BookPage() {
	const { user } = useAuth();
	const nav = useNavigate();
	const ask = useServerFn(askAssistant);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [aiBusy, setAiBusy] = (0, import_react.useState)(false);
	const [advice, setAdvice] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		device_type: "Phone",
		brand: "",
		model: "",
		serial_number: "",
		problem_reported: ""
	});
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const askAi = async () => {
		if (!form.problem_reported.trim()) return toast.error("Describe the problem first.");
		setAiBusy(true);
		try {
			const res = await ask({ data: { messages: [{
				role: "user",
				content: `Device: ${form.device_type} ${form.brand} ${form.model}. Problem: ${form.problem_reported}. Give a likely diagnosis, rough KSh cost range and expected turnaround. Keep it under 120 words.`
			}] } });
			setAdvice(res.text);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "AI is unavailable right now.");
		} finally {
			setAiBusy(false);
		}
	};
	const submit = async (e) => {
		e.preventDefault();
		if (!user) return;
		if (!form.problem_reported.trim()) return toast.error("Please describe the problem.");
		setBusy(true);
		const { data, error } = await supabase.from("repair_tickets").insert({
			customer_id: user.id,
			device_type: form.device_type,
			brand: form.brand || null,
			model: form.model || null,
			serial_number: form.serial_number || null,
			problem_reported: form.problem_reported
		}).select("tracking_id").single();
		setBusy(false);
		if (error) return toast.error(error.message);
		toast.success(`Booked! Tracking ID ${data.tracking_id}`);
		nav({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-primary font-semibold",
				children: "New request"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-semibold",
				children: "Book a repair"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Tell us what's wrong. You'll get a tracking ID instantly."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Device type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: device_types.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => set("device_type", d),
											className: `rounded-full border px-3 py-1.5 text-xs transition ${form.device_type === d ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-accent"}`,
											children: d
										}, d))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "brand",
										children: "Brand"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "brand",
										value: form.brand,
										onChange: (e) => set("brand", e.target.value),
										placeholder: "Apple, Samsung, HP…"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "model",
										children: "Model"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "model",
										value: form.model,
										onChange: (e) => set("model", e.target.value),
										placeholder: "iPhone 13, ThinkPad X1…"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "serial",
										children: "Serial / IMEI (optional)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "serial",
										value: form.serial_number,
										onChange: (e) => set("serial_number", e.target.value)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "problem",
								children: "What's the problem?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "problem",
								rows: 4,
								value: form.problem_reported,
								onChange: (e) => set("problem_reported", e.target.value),
								placeholder: "Screen cracked and touch not responding on the left side…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: askAi,
								disabled: aiBusy,
								children: [aiBusy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 mr-2" }), "Ask AI for a quick diagnosis"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: busy,
								className: "bg-gradient-primary shadow-elegant",
								children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4 mr-2" }), "Submit booking"]
							})]
						}),
						advice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-accent/40 p-4 text-sm whitespace-pre-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " AI estimate"]
								}),
								advice,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-xs text-muted-foreground",
									children: "Estimate only — final quote follows diagnosis."
								})
							]
						})
					]
				})
			})
		})]
	});
}
//#endregion
export { BookPage as component };
