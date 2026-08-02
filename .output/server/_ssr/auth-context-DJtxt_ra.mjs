import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-aDQb08CI.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-DJtxt_ra.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AuthCtx = (0, import_react.createContext)({
	user: null,
	session: null,
	roles: [],
	loading: true,
	signOut: async () => {},
	refresh: async () => {}
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [roles, setRoles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadRoles = async (uid) => {
		const { data } = await supabase.from("user_roles").select("role").eq("user_id", uid);
		setRoles((data ?? []).map((r) => r.role));
	};
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
			setSession(s);
			if (s?.user) setTimeout(() => loadRoles(s.user.id), 0);
			else setRoles([]);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			if (data.session?.user) loadRoles(data.session.user.id).finally(() => setLoading(false));
			else setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	const refresh = async () => {
		if (session?.user) await loadRoles(session.user.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthCtx.Provider, {
		value: {
			user: session?.user ?? null,
			session,
			roles,
			loading,
			refresh,
			signOut: async () => {
				await supabase.auth.signOut();
			}
		},
		children
	});
}
var useAuth = () => (0, import_react.useContext)(AuthCtx);
//#endregion
export { useAuth as n, AuthProvider as t };
