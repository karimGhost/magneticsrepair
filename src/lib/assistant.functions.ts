import { createServerFn } from "@tanstack/react-start";
import { AssistantInput } from "./assistant.prompt";

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AssistantInput.parse(input))
  .handler(async ({ data }) => {
    const { runAssistant } = await import("./assistant.server");
    return runAssistant(data.messages);
  });
