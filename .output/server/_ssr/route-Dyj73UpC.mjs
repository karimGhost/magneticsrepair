import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as useAuth } from "./auth-context-DJtxt_ra.mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Package, H as CreditCard, N as LayoutDashboard, Q as Bell, T as Moon, Z as Bot, f as Sun, g as ShieldCheck, j as LogOut, n as X, p as Star, r as Wrench, v as Send, y as Search } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { n as useServerFn, t as askAssistant } from "./assistant.functions-CHurcDWA.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { n as useTheme } from "./theme-DsPVEmCt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Dyj73UpC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
function NotificationsBell() {
	const { user } = useAuth();
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!user) return;
		let active = true;
		supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(25).then(({ data }) => {
			if (active) setItems(data ?? []);
		});
		const channel = supabase.channel(`notifications-${user.id}`).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "notifications",
			filter: `user_id=eq.${user.id}`
		}, (payload) => {
			const n = payload.new;
			setItems((prev) => [n, ...prev]);
			toast(n.title, { description: n.body ?? void 0 });
		}).subscribe();
		return () => {
			active = false;
			supabase.removeChannel(channel);
		};
	}, [user]);
	const unread = items.filter((i) => !i.read).length;
	const markAllRead = async () => {
		if (!user || unread === 0) return;
		setItems((prev) => prev.map((i) => ({
			...i,
			read: true
		})));
		await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		onOpenChange: (o) => o && markAllRead(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "relative grid h-9 w-9 place-items-center rounded-lg hover:bg-accent transition",
				"aria-label": "Notifications",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground",
					children: unread
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			align: "end",
			className: "w-80 p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-3 border-b border-border text-sm font-semibold",
				children: "Notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-80 overflow-y-auto divide-y divide-border",
				children: [items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 text-center text-sm text-muted-foreground",
					children: "You're all caught up."
				}), items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: n.title
						}),
						n.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: n.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-muted-foreground mt-1",
							children: new Date(n.created_at).toLocaleString()
						})
					]
				}, n.id))]
			})]
		})]
	});
}
var SUGGESTIONS = [
	"My phone won't charge — what could it be?",
	"How long does a screen replacement take?",
	"What does 'waiting for parts' mean?"
];
function AiAssistant() {
	const ask = useServerFn(askAssistant);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [text, setText] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, loading]);
	const send = async (value) => {
		const content = (value ?? text).trim();
		if (!content || loading) return;
		const next = [...messages, {
			role: "user",
			content
		}];
		setMessages(next);
		setText("");
		setLoading(true);
		try {
			const res = await ask({ data: { messages: next } });
			setMessages([...next, {
				role: "assistant",
				content: res.text
			}]);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Assistant unavailable");
			setMessages(next);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setOpen(true),
		className: "fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" }), " Ask Magnet"]
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 right-6 z-40 flex h-[30rem] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold leading-none",
						children: "Magnet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-muted-foreground",
						children: "AI repair assistant"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setOpen(false),
					"aria-label": "Close assistant",
					className: "rounded-md p-1 hover:bg-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3 overflow-y-auto p-4",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Hi! I can help diagnose faults, estimate costs and explain your repair status."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => send(s),
								className: "rounded-full border border-border px-3 py-1.5 text-xs hover:bg-accent",
								children: s
							}, s))
						})]
					}),
					messages.map((m, i) => m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[85%] rounded-2xl bg-primary px-3.5 py-2 text-sm text-primary-foreground whitespace-pre-wrap",
							children: m.content
						})
					}, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed",
						children: m.content
					}, i)),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-muted-foreground animate-pulse",
						children: "Thinking…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-border p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "Ask about your repair…",
					maxLength: 1e3
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: loading || !text.trim(),
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
				})]
			})
		]
	})] });
}
function AppShell({ children }) {
	const { user, roles, signOut } = useAuth();
	const { theme, toggle } = useTheme();
	const nav = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const nav_items = (0, import_react.useMemo)(() => {
		const items = [{
			to: "/dashboard",
			label: "Dashboard",
			icon: LayoutDashboard
		}, {
			to: "/book",
			label: "Book repair",
			icon: Wrench
		}];
		if (roles.includes("technician") || roles.includes("admin")) items.push({
			to: "/technician",
			label: "Repairs",
			icon: Wrench
		});
		if (roles.includes("technician") || roles.includes("admin")) items.push({
			to: "/inventory",
			label: "Inventory",
			icon: Package
		});
		items.push({
			to: "/payments",
			label: "Payments",
			icon: CreditCard
		});
		items.push({
			to: "/reviews",
			label: "Reviews",
			icon: Star
		});
		if (roles.includes("admin")) items.push({
			to: "/admin",
			label: "Admin",
			icon: ShieldCheck
		});
		return items;
	}, [roles]);
	const handleSignOut = async () => {
		await signOut();
		nav({
			to: "/",
			replace: true
		});
	};
	const initials = (user?.email ?? "?").slice(0, 2).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden md:flex w-60 shrink-0 flex-col border-r border-border/60 bg-card/50 backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 px-5 h-16 font-semibold border-b border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Magnetic", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "Repair"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 p-3 space-y-1",
					children: nav_items.map((n) => {
						const active = pathname === n.to || pathname.startsWith(n.to + "/");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							className: `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-4 w-4" }),
								" ",
								n.label
							]
						}, n.to + n.label);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-t border-border/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 px-2 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold",
							children: initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium truncate",
								children: user?.email
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: roles.join(" · ") || "customer"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: handleSignOut,
						className: "mt-1 w-full justify-start text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 mr-2" }), " Sign out"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 min-w-0 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "h-16 border-b border-border/60 flex items-center gap-3 px-4 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex items-center gap-2 max-w-md rounded-lg border border-border bg-card px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Search repairs, customers…",
								className: "bg-transparent outline-none text-sm w-full"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggle,
							className: "grid h-9 w-9 place-items-center rounded-lg hover:bg-accent transition",
							"aria-label": "Toggle theme",
							children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsBell, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 min-w-0 p-4 sm:p-6 lg:p-8",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiAssistant, {})
			]
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
