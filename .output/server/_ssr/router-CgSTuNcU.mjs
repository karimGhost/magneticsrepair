import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as AuthProvider } from "./auth-context-DJtxt_ra.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$10 } from "./auth-CGm8psoN.mjs";
import { t as ThemeProvider } from "./theme-DsPVEmCt.mjs";
import { t as Route$11 } from "./track-NQfjGlr1.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CgSTuNcU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Chb6k4cs.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var SW_URL = "/sw.js";
function isBlockedContext() {
	if (typeof window === "undefined") return true;
	try {
		if (window.self !== window.top) return true;
	} catch {
		return true;
	}
	const host = window.location.hostname;
	if (host.startsWith("id-preview--") || host.startsWith("preview--")) return true;
	if (host === "lovableproject.com" || host.endsWith(".lovableproject.com")) return true;
	if (host === "lovableproject-dev.com" || host.endsWith(".lovableproject-dev.com")) return true;
	if (host === "beta.lovable.dev" || host.endsWith(".beta.lovable.dev")) return true;
	if (new URLSearchParams(window.location.search).has("sw")) return new URLSearchParams(window.location.search).get("sw") === "off";
	return false;
}
async function unregisterAppWorkers() {
	if (!("serviceWorker" in navigator)) return;
	const registrations = await navigator.serviceWorker.getRegistrations();
	await Promise.allSettled(registrations.filter((r) => (r.active?.scriptURL ?? r.installing?.scriptURL ?? "").endsWith(SW_URL)).map((r) => r.unregister()));
}
function registerServiceWorker() {
	if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
	if (isBlockedContext()) {
		unregisterAppWorkers();
		return;
	}
	window.addEventListener("load", () => {
		navigator.serviceWorker.register(SW_URL, { scope: "/" }).catch(() => {});
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Magnetic Repair — Premium Device Repair Workshop" },
			{
				name: "description",
				content: "Magnetic Repair — expert phone, laptop, and device repairs. Track repairs, chat with technicians, and get warrantied service."
			},
			{
				name: "author",
				content: "Magnetic Repair"
			},
			{
				property: "og:title",
				content: "Magnetic Repair — Premium Device Repair Workshop"
			},
			{
				property: "og:description",
				content: "Book, track, and manage your device repairs with Magnetic Repair."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#107a44"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Magnetic"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-192.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	(0, import_react.useEffect)(() => {
		registerServiceWorker();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-right"
		})] }) })
	});
}
var $$splitComponentImporter$8 = () => import("./routes-DigjWvJu.mjs");
var Route$8 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Magnetic Repair — Premium Device Repair Workshop" },
		{
			name: "description",
			content: "Fast, warrantied phone, laptop, and console repairs. Book, track, and pay online."
		},
		{
			property: "og:title",
			content: "Magnetic Repair — Premium Device Repair"
		},
		{
			property: "og:description",
			content: "Book, track, and manage your device repairs with confidence."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./route-Dyj73UpC.mjs");
var Route$7 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin-qJE13rTv.mjs");
var Route$6 = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [{ title: "Admin — Magnetic Repair" }, {
		name: "description",
		content: "Administrator control center."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./book-CtXQlrtC.mjs");
var Route$5 = createFileRoute("/_authenticated/book")({
	head: () => ({ meta: [
		{ title: "Book a repair — Magnetic Repair" },
		{
			name: "description",
			content: "Describe your device fault and book a warrantied repair with Magnetic Repair."
		},
		{
			property: "og:title",
			content: "Book a repair — Magnetic Repair"
		},
		{
			property: "og:description",
			content: "Describe your device fault and book a warrantied repair."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard-BnWqGZiW.mjs");
var Route$4 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — Magnetic Repair" }, {
		name: "description",
		content: "Your repairs at a glance."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./inventory-C8qrkRqB.mjs");
var Route$3 = createFileRoute("/_authenticated/inventory")({
	head: () => ({ meta: [
		{ title: "Inventory — Magnetic Repair" },
		{
			name: "description",
			content: "Track spare parts, stock levels and reorder alerts for the Magnetic Repair workshop."
		},
		{
			property: "og:title",
			content: "Inventory — Magnetic Repair"
		},
		{
			property: "og:description",
			content: "Spare parts stock control for the Magnetic Repair workshop."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./payments-ChDRw9rj.mjs");
var Route$2 = createFileRoute("/_authenticated/payments")({
	head: () => ({ meta: [
		{ title: "Payments — Magnetic Repair" },
		{
			name: "description",
			content: "Record and reconcile M-Pesa, cash, card and bank payments for device repairs."
		},
		{
			property: "og:title",
			content: "Payments — Magnetic Repair"
		},
		{
			property: "og:description",
			content: "Repair payment ledger for the Magnetic Repair workshop."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./reviews-Bs6QQa9J.mjs");
var Route$1 = createFileRoute("/_authenticated/reviews")({
	head: () => ({ meta: [
		{ title: "Reviews — Magnetic Repair" },
		{
			name: "description",
			content: "Rate your completed repair and read what other Magnetic Repair customers say."
		},
		{
			property: "og:title",
			content: "Reviews — Magnetic Repair"
		},
		{
			property: "og:description",
			content: "Customer ratings and feedback for Magnetic Repair."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./technician-CAHKq-bZ.mjs");
var Route = createFileRoute("/_authenticated/technician")({
	head: () => ({ meta: [{ title: "Technician — Magnetic Repair" }, {
		name: "description",
		content: "Manage assigned repairs."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteRoute = Route$7.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var TrackRoute = Route$11.update({
	id: "/track",
	path: "/track",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute: Route$6.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedBookRoute: Route$5.update({
		id: "/book",
		path: "/book",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedDashboardRoute: Route$4.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedInventoryRoute: Route$3.update({
		id: "/inventory",
		path: "/inventory",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPaymentsRoute: Route$2.update({
		id: "/payments",
		path: "/payments",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedReviewsRoute: Route$1.update({
		id: "/reviews",
		path: "/reviews",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedTechnicianRoute: Route.update({
		id: "/technician",
		path: "/technician",
		getParentRoute: () => AuthenticatedRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	TrackRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
