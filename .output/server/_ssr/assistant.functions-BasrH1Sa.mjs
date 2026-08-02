import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as AssistantInput } from "./assistant.prompt-CzuWegDE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.functions-BasrH1Sa.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askAssistant_createServerFn_handler = createServerRpc({
	id: "a25da347868e1aa3590e1280af68cec37d48865abed05dc6d83b2e090c30c963",
	name: "askAssistant",
	filename: "src/lib/assistant.functions.ts"
}, (opts) => askAssistant.__executeServer(opts));
var askAssistant = createServerFn({ method: "POST" }).inputValidator((input) => AssistantInput.parse(input)).handler(askAssistant_createServerFn_handler, async ({ data }) => {
	const { runAssistant } = await import("./assistant.server-Dv7O5Lwi.mjs");
	return runAssistant(data.messages);
});
//#endregion
export { askAssistant_createServerFn_handler };
