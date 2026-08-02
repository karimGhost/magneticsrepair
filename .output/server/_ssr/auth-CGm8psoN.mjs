import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as objectType, Ot as enumType } from "../_libs/@ai-sdk/gateway+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CGm8psoN.js
var $$splitComponentImporter = () => import("./auth-0agqo0Ic.mjs");
var searchSchema = objectType({ mode: enumType(["signin", "signup"]).optional() });
var Route = createFileRoute("/auth")({
	validateSearch: (s) => searchSchema.parse(s),
	head: () => ({ meta: [{ title: "Sign in — Magnetic Repair" }, {
		name: "description",
		content: "Sign in or create an account with Magnetic Repair."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
