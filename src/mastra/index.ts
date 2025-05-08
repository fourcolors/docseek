import { Mastra, Agent } from "@mastra/core";
import { doctorMatchingAgent } from "./agents/doctorMatchingAgent";
import { diagnosticAgent } from "./agents/diagnosticAgent"; // Exports diagnosticAgent
import { storage } from "./storage";
import { DoctorService } from "./services/doctorService";

/**
 * @file index.ts
 * Main Mastra configuration and export for the DocSeek application.
 * This file initializes the Mastra instance and registers all agents.
 * It also provides an example of how to start a conversation with the diagnostic agent.
 */

/**
 * Interface for extended Agent with createThread method
 */
interface ExtendedAgent extends Agent {
  createThread: () => Promise<any>;
}

/**
 * Interface for our Mastra instance with properly typed agents
 */
interface DocseekMastra {
  agents: {
    diagnosticAgent: ExtendedAgent;
    doctorMatchingAgent: ExtendedAgent;
  };
}

// Type assertion to ensure TypeScript recognizes our mastra instance has the agents property
// Using a two-step type assertion with 'unknown' as an intermediate type for type safety
export const mastra = new Mastra({
  agents: {
    diagnosticAgent,
    doctorMatchingAgent,
  },
  storage, // Shared storage for all agents
}) as unknown as DocseekMastra;

// Initialize the doctor service with the doctor matching agent
export const doctorService = new DoctorService(doctorMatchingAgent);
