import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as objectType, jt as stringType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-NQfjGlr1.js
var $$splitComponentImporter = () => import("./track--0INs-8e.mjs");
var Route = createFileRoute("/track")({
	validateSearch: (s) => objectType({ q: stringType().optional() }).parse(s),
	head: () => ({ meta: [{ title: "Track Repair — Magnetic Repair" }, {
		name: "description",
		content: "Track your device repair in real time."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
