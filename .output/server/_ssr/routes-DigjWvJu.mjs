import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as cn, t as Button } from "./button-BpE9Czok.mjs";
import { n as CardContent, t as Card } from "./card-CIcse5Os.mjs";
import { E as MessageSquare, J as ChevronDown, K as CircleCheck, L as Headphones, P as Laptop, R as Gamepad2, W as Clock, d as Tablet, et as ArrowRight, g as ShieldCheck, h as Smartphone, i as Watch, k as MapPin, m as Sparkles, p as Star, r as Wrench, t as Zap, w as PackageCheck, y as Search } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Input } from "./input-NvmijQlt.mjs";
import { t as Textarea } from "./textarea-Cp94w9lz.mjs";
import { n as Navbar, r as WhatsAppButton, t as Footer } from "./WhatsAppButton-CRkpMBiI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DigjWvJu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var services = [
	{
		icon: Smartphone,
		title: "Phone Repair",
		desc: "Screens, batteries, boards & water damage."
	},
	{
		icon: Laptop,
		title: "Laptop Repair",
		desc: "Keyboards, SSD upgrades, OS installs, cleaning."
	},
	{
		icon: Tablet,
		title: "Tablet Repair",
		desc: "Digitizers, charging ports, glass replacements."
	},
	{
		icon: Watch,
		title: "Smartwatch",
		desc: "Batteries, glass and sensor repairs."
	},
	{
		icon: Gamepad2,
		title: "Consoles",
		desc: "PS5, Xbox, Switch — HDMI, drives, fans."
	},
	{
		icon: Headphones,
		title: "Audio Gear",
		desc: "Headphones, speakers, DACs and mics."
	}
];
var why = [
	{
		icon: ShieldCheck,
		title: "90-day warranty",
		desc: "Every repair backed by our written warranty."
	},
	{
		icon: Zap,
		title: "Same-day fixes",
		desc: "Most repairs completed within 24 hours."
	},
	{
		icon: Clock,
		title: "Live tracking",
		desc: "Watch your repair progress in real time."
	},
	{
		icon: Sparkles,
		title: "Certified techs",
		desc: "Board-level trained, factory-grade parts."
	}
];
var process = [
	{
		icon: MessageSquare,
		title: "Book",
		desc: "Tell us the issue. Get an instant quote."
	},
	{
		icon: PackageCheck,
		title: "Drop off",
		desc: "Bring your device or request a pickup."
	},
	{
		icon: Wrench,
		title: "Repair",
		desc: "Certified technicians fix and quality-check."
	},
	{
		icon: CircleCheck,
		title: "Collect",
		desc: "Pay securely. Enjoy your warrantied device."
	}
];
var reviews = [
	{
		name: "Amina K.",
		role: "iPhone 14 · Screen",
		text: "Fast, honest, and clean work. Tracked it live on my phone. Impressive.",
		rating: 5
	},
	{
		name: "David M.",
		role: "MacBook Pro · SSD",
		text: "Diagnosed a board fault others missed. Saved me a fortune.",
		rating: 5
	},
	{
		name: "Wanjiku N.",
		role: "PS5 · HDMI",
		text: "Back in 24h with a proper warranty. Won't go anywhere else.",
		rating: 5
	}
];
function useLiveReviews() {
	const [live, setLive] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		supabase.from("reviews").select("rating, comment, created_at").eq("approved", true).not("comment", "is", null).order("created_at", { ascending: false }).limit(3).then(({ data }) => setLive((data ?? []).map((r) => ({
			name: "Verified customer",
			role: new Date(r.created_at).toLocaleDateString(),
			rating: r.rating,
			text: r.comment
		}))));
	}, []);
	return live;
}
function Landing() {
	const live = useLiveReviews();
	const displayReviews = live.length > 0 ? live : reviews;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-hero" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-24 pb-20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }), " Now booking · 24h turnaround"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]",
								children: [
									"Premium repairs.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-primary bg-clip-text text-transparent",
										children: "Zero drama."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-lg text-muted-foreground max-w-xl",
								children: "Magnetic Repair fixes your phone, laptop, tablet, and console with certified technicians, transparent pricing, and a 90-day warranty. Track every step, live."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									className: "bg-gradient-primary shadow-elegant",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										children: ["Book a repair ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									variant: "outline",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/track",
										children: "Track my repair"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 font-medium text-foreground",
												children: "4.9"
											}),
											" · 2,400+ repairs"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Certified · Warrantied · Insured" })
								]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "about",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-10 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-primary font-semibold",
							children: "About us"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl sm:text-4xl font-semibold",
							children: "A workshop that treats your device like ours."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground leading-relaxed",
							children: "We're a team of board-level trained technicians obsessed with clean, honest work. From cracked screens to complex logic-board failures, we diagnose fast, quote fairly, and repair with genuine or factory-grade parts — every job backed by our written warranty."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [
							["12k+", "Repairs completed"],
							["4.9★", "Average rating"],
							["24h", "Avg. turnaround"],
							["90 days", "Warranty on repairs"]
						].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "shadow-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-semibold",
									children: n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground mt-1",
									children: l
								})]
							})
						}, l))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "services",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-primary font-semibold",
						children: "Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl sm:text-4xl font-semibold",
						children: "Everything we repair."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-md",
						children: "Flat-rate diagnostics. Free quotes. No fix, no fee — on eligible repairs."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-2 md:grid-cols-3 gap-4",
					children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "group shadow-card hover:shadow-elegant transition-shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 place-items-center rounded-lg bg-accent text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 font-semibold",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm text-muted-foreground",
									children: s.desc
								})
							]
						})
					}, s.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl bg-gradient-primary/10 border border-border p-8 sm:p-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-primary font-semibold",
								children: "Why choose us"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-3xl sm:text-4xl font-semibold",
								children: "Built for people who value their time."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Modern workshops should feel modern. Live tracking, digital receipts, and honest technicians — no jargon, no surprises."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid sm:grid-cols-2 gap-4",
							children: why.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-card p-5 shadow-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-9 w-9 place-items-center rounded-lg bg-accent text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(w.icon, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 font-semibold",
										children: w.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground mt-1",
										children: w.desc
									})
								]
							}, w.title))
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "process",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-primary font-semibold",
						children: "Repair Process"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl sm:text-4xl font-semibold",
						children: "Four simple steps."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid md:grid-cols-4 gap-4",
					children: process.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs font-mono text-muted-foreground",
									children: ["STEP 0", i + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 font-semibold",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm text-muted-foreground",
									children: p.desc
								})
							]
						})
					}, p.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "reviews",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-primary font-semibold",
						children: "Customer reviews"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl sm:text-4xl font-semibold",
						children: "Loved by thousands."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid md:grid-cols-3 gap-4",
					children: displayReviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "shadow-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-0.5",
									children: Array.from({ length: r.rating }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm",
									children: r.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: r.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: r.role
									})]
								})
							]
						})
					}, r.name + r.text))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "faq",
				className: "mx-auto max-w-3xl px-4 sm:px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-primary font-semibold",
						children: "FAQ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl sm:text-4xl font-semibold",
						children: "Common questions."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "mt-8",
					children: [
						["How long does a typical repair take?", "Most phone repairs are done within 24 hours. Complex board-level jobs may take 2–3 days."],
						["Do you use genuine parts?", "We use genuine or factory-grade parts. We'll always disclose part origin upfront."],
						["What is your warranty?", "All repairs come with a 90-day warranty covering the specific fix and parts installed."],
						["Can I track my repair online?", "Yes — every ticket gets a tracking ID with live status updates and technician notes."],
						["How do I pay?", "M-Pesa, cash, card, or bank transfer. Digital receipts are issued instantly."]
					].map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: q,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-left",
							children: q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "text-muted-foreground",
							children: a
						})]
					}, q))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl bg-gradient-primary text-primary-foreground p-8 sm:p-12 shadow-elegant relative overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-8 items-center relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl sm:text-4xl font-semibold",
							children: "Track your repair in real time."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 opacity-90 max-w-md",
							children: "Enter your tracking ID, phone, or receipt number to see live progress from diagnosis to pickup."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								const q = new FormData(e.currentTarget).get("q");
								window.location.href = `/track?q=${encodeURIComponent(String(q ?? ""))}`;
							},
							className: "flex gap-2 bg-card text-foreground rounded-2xl p-2 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex items-center gap-2 px-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "q",
									placeholder: "MAG-2026-000123 or phone / receipt",
									className: "w-full bg-transparent outline-none text-sm py-3"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-primary",
								children: "Track"
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "contact",
				className: "mx-auto max-w-7xl px-4 sm:px-6 py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-primary font-semibold",
							children: "Contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl sm:text-4xl font-semibold",
							children: "Get in touch."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-muted-foreground",
							children: "Message us or drop by the workshop."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" }), " Nairobi CBD, Kenya"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), " Business Reg. #123456"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 overflow-hidden rounded-2xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Location",
								src: "https://www.google.com/maps?q=Nairobi&output=embed",
								className: "w-full h-64",
								loading: "lazy"
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "rounded-2xl border border-border p-6 shadow-card space-y-3",
						onSubmit: (e) => {
							e.preventDefault();
							alert("Thanks! We'll be in touch.");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Your name",
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									placeholder: "Email",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "Subject" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								placeholder: "How can we help?",
								rows: 5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "bg-gradient-primary w-full",
								children: "Send message"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {})
		]
	});
}
//#endregion
export { Landing as component };
