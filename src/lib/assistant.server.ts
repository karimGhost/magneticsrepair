import { generateText } from "ai";
import { google } from "./ai-gateway.server";
import { ASSISTANT_SYSTEM } from "./assistant.prompt";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

export async function runAssistant(messages: Msg[]) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("Google AI API key is missing.");
  }

  try {
    const { text } = await generateText({
    model: google("gemini-3.6-flash"),
      system: ASSISTANT_SYSTEM,
      messages,
    });

    return { text };
  } catch (error) {
    console.error(error);
    throw new Error("The assistant couldn't answer that.");
  }
}