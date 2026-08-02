import { t as ASSISTANT_SYSTEM } from "./assistant.prompt-CzuWegDE.mjs";
import { t as generateText } from "../_libs/ai.mjs";
import { t as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant.server-Dv7O5Lwi.js
function createLovableAiGatewayProvider(apiKey) {
	return createOpenAICompatible({
		name: "lovable",
		baseURL: "https://ai.gateway.lovable.dev/v1",
		headers: { "Lovable-API-Key": apiKey }
	});
}
async function runAssistant(messages) {
	const key = processModule.env["LOVABLE_API_KEY"];
	if (!key) throw new Error("AI assistant is not configured.");
	const gateway = createLovableAiGatewayProvider(key);
	try {
		const { text } = await generateText({
			model: gateway("google/gemini-3.6-flash"),
			system: ASSISTANT_SYSTEM,
			messages
		});
		return { text };
	} catch (error) {
		const message = error instanceof Error ? error.message : "";
		console.error("assistant error", message);
		if (message.includes("429")) throw new Error("The assistant is busy right now — please try again in a moment.");
		if (message.includes("402")) throw new Error("AI credits are exhausted. Please top up in workspace billing.");
		throw new Error("The assistant couldn't answer that. Please try again.");
	}
}
//#endregion
export { runAssistant };
