import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { doctorRouter } from "~/mastra/tools/doctorRouter";

/**
 * Medical Diagnosis Agent
 * - Diagnoses medical conditions via chat
 * - Uses a tool to route to the right doctor for the symptom
 * - Uses Zod for input/output validation
 */
export const medicalAgent = new Agent({
  name: "Medical Diagnosis Agent",
  instructions: `You are a medical assistant. Have a conversation to understand the user's symptoms, ask clarifying questions if needed, and try to identify the likely medical issue. When you have enough information, use the doctorRouter tool to route the user to the right doctor for their symptom.`,
  model: openai("gpt-4o"),
  tools: {
    doctorRouter,
  },
});
