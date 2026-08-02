import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { t as Button } from "./button-BpE9Czok.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as MessageSquare, v as Send } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-D85IC6Pl.mjs";
import { t as E } from "../_libs/jspdf.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipt-DYscX8-s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function TicketChat({ ticketId, label = "Chat" }) {
	const { user } = useAuth();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [text, setText] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		let active = true;
		supabase.from("ticket_messages").select("*").eq("ticket_id", ticketId).order("created_at", { ascending: true }).then(({ data }) => {
			if (active) setMessages(data ?? []);
		});
		const channel = supabase.channel(`ticket-chat-${ticketId}`).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "ticket_messages",
			filter: `ticket_id=eq.${ticketId}`
		}, (payload) => setMessages((prev) => prev.some((m) => m.id === payload.new.id) ? prev : [...prev, payload.new])).subscribe();
		return () => {
			active = false;
			supabase.removeChannel(channel);
		};
	}, [open, ticketId]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const send = async () => {
		const body = text.trim();
		if (!body || !user) return;
		setSending(true);
		const { error } = await supabase.from("ticket_messages").insert({
			ticket_id: ticketId,
			sender_id: user.id,
			body
		});
		setSending(false);
		if (error) return toast.error(error.message);
		setText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 mr-1.5" }),
					" ",
					label
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Repair conversation" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-80 overflow-y-auto space-y-3 pr-1",
					children: [
						messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground text-center py-12",
							children: "No messages yet — say hello 👋"
						}),
						messages.map((m) => {
							const mine = m.sender_id === user?.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex ${mine ? "justify-end" : "justify-start"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "whitespace-pre-wrap break-words",
										children: m.body
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`,
										children: new Date(m.created_at).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit"
										})
									})]
								})
							}, m.id);
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						send();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: text,
						onChange: (e) => setText(e.target.value),
						placeholder: "Type a message…",
						maxLength: 1e3
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: sending || !text.trim(),
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
					})]
				})
			]
		})]
	});
}
var money = (n) => `KSh ${Number(n || 0).toLocaleString()}`;
async function buildReceiptPdf(t, parties = {}) {
	const doc = new E({
		unit: "pt",
		format: "a4"
	});
	const W = doc.internal.pageSize.getWidth();
	const trackUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/track?q=${t.tracking_id}`;
	doc.setFillColor(16, 122, 68);
	doc.rect(0, 0, W, 90, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("helvetica", "bold").setFontSize(20).text("Magnetic Repair", 40, 44);
	doc.setFont("helvetica", "normal").setFontSize(10).text("Premium device repair workshop", 40, 62);
	doc.setFont("helvetica", "bold").setFontSize(12).text("REPAIR RECEIPT", W - 40, 44, { align: "right" });
	doc.setFont("helvetica", "normal").setFontSize(10).text(t.tracking_id, W - 40, 62, { align: "right" });
	doc.setTextColor(20, 20, 20);
	let y = 130;
	const row = (label, value) => {
		doc.setFont("helvetica", "bold").setFontSize(9).setTextColor(110, 110, 110).text(label.toUpperCase(), 40, y);
		doc.setFont("helvetica", "normal").setFontSize(11).setTextColor(20, 20, 20).text(value || "—", 190, y);
		y += 22;
	};
	row("Issued", (/* @__PURE__ */ new Date()).toLocaleString());
	row("Received", new Date(t.created_at).toLocaleDateString());
	row("Customer", parties.customerName || "—");
	row("Technician", parties.technicianName || "Not assigned yet");
	row("Device", `${t.device_type}${t.brand ? ` · ${t.brand}` : ""}${t.model ? ` ${t.model}` : ""}`);
	row("Serial / IMEI", t.serial_number || "—");
	row("Reported issue", doc.splitTextToSize(t.problem_reported, 320)[0]);
	if (t.diagnosis) row("Diagnosis", doc.splitTextToSize(t.diagnosis, 320)[0]);
	row("Status", t.status.replace(/_/g, " "));
	row("Warranty", `${t.warranty_days ?? 0} days`);
	y += 10;
	doc.setDrawColor(225).line(40, y, W - 40, y);
	y += 26;
	doc.setFont("helvetica", "bold").setFontSize(11).setTextColor(16, 122, 68).text("CHARGES", 40, y);
	y += 22;
	const balance = Number(t.total_amount || 0) - Number(t.deposit_paid || 0);
	[
		["Estimated cost", money(t.estimated_cost)],
		["Labour", money(t.labour_cost)],
		["Deposit paid", money(t.deposit_paid)],
		["Total", money(t.total_amount)],
		["Balance due", money(balance)]
	].forEach(([k, v], i) => {
		const bold = i >= 3;
		doc.setFont("helvetica", bold ? "bold" : "normal").setFontSize(bold ? 12 : 11);
		doc.setTextColor(bold ? 16 : 90, bold ? 122 : 90, bold ? 68 : 90).text(k, 40, y);
		doc.setTextColor(20, 20, 20).text(v, 360, y);
		y += 22;
	});
	const qr = await import_lib.toDataURL(trackUrl, {
		margin: 1,
		width: 300
	});
	doc.addImage(qr, "PNG", W - 160, 320, 120, 120);
	doc.setFontSize(8).setTextColor(110).text("Scan to track this repair", W - 100, 452, { align: "center" });
	doc.setFontSize(8).setTextColor(140).text("Thank you for choosing Magnetic Repair. Present this receipt when collecting your device.", 40, doc.internal.pageSize.getHeight() - 40);
	return doc;
}
async function downloadReceipt(t, parties = {}) {
	(await buildReceiptPdf(t, parties)).save(`${t.tracking_id}-receipt.pdf`);
}
//#endregion
export { downloadReceipt as n, TicketChat as t };
