import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { t as Badge } from "./badge-DHlcf1ty.mjs";
import { K as CircleCheck, M as LoaderCircle, y as Search } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Progress } from "./progress-ChzuiZwr.mjs";
import { t as Route } from "./track-NQfjGlr1.mjs";
import { n as Navbar, r as WhatsAppButton, t as Footer } from "./WhatsAppButton-CRkpMBiI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track--0INs-8e.js
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
function TrackPage() {
	const { q } = Route.useSearch();
	const [query, setQuery] = (0, import_react.useState)(q ?? "");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [ticket, setTicket] = (0, import_react.useState)(null);
	const [updates, setUpdates] = (0, import_react.useState)([]);
	const [notFound, setNotFound] = (0, import_react.useState)(false);
	const search = async (val) => {
		if (!val.trim()) return;
		setLoading(true);
		setNotFound(false);
		setTicket(null);
		const { data } = await supabase.from("repair_tickets").select("*").or(`tracking_id.eq.${val},serial_number.eq.${val},imei.eq.${val}`).limit(1).maybeSingle();
		if (data) {
			setTicket(data);
			const { data: u } = await supabase.from("repair_updates").select("*").eq("ticket_id", data.id).order("created_at", { ascending: false });
			setUpdates(u ?? []);
		} else setNotFound(true);
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		if (q) search(q);
	}, [q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-4xl px-4 sm:px-6 pt-10 pb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-primary font-semibold",
								children: "Track Repair"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl sm:text-4xl font-semibold",
								children: "Where's my device?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground",
								children: "Enter tracking ID, serial number, or IMEI."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							search(query);
						},
						className: "mt-8 flex gap-2 rounded-2xl border border-border bg-card p-2 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex items-center gap-2 px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "MAG-2026-000123",
								className: "border-0 shadow-none focus-visible:ring-0"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "bg-gradient-primary",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Track"
						})]
					}),
					notFound && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: [
							"No repair found for \"",
							query,
							"\"."
						]
					}),
					ticket && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "shadow-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-mono text-muted-foreground",
												children: ticket.tracking_id
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xl font-semibold mt-1",
												children: [
													ticket.brand,
													" ",
													ticket.model
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm text-muted-foreground",
												children: ticket.device_type
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "bg-gradient-primary text-primary-foreground h-fit",
											children: STATUS_LABEL[ticket.status]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs text-muted-foreground mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [ticket.progress, "%"] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: ticket.progress })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 grid sm:grid-cols-3 gap-4 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground text-xs",
												children: "Reported"
											}), ticket.problem_reported] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground text-xs",
												children: "Diagnosis"
											}), ticket.diagnosis || "—"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-muted-foreground text-xs",
												children: "Expected completion"
											}), ticket.expected_completion || "—"] })
										]
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "shadow-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold mb-4",
										children: "Timeline"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "relative border-l border-border pl-6 space-y-5",
										children: STAGES.map((s) => {
											const active = STAGES.indexOf(s) <= STAGES.indexOf(ticket.status);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `absolute -left-[29px] grid h-5 w-5 place-items-center rounded-full ${active ? "bg-gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
													children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `text-sm font-medium ${active ? "" : "text-muted-foreground"}`,
													children: STATUS_LABEL[s]
												})]
											}, s);
										})
									}),
									updates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 pt-6 border-t border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium mb-3",
											children: "Technician notes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-3",
											children: updates.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-muted-foreground",
													children: new Date(u.created_at).toLocaleString()
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: u.note })]
											}, u.id))
										})]
									})
								]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {})
		]
	});
}
//#endregion
export { TrackPage as component };
