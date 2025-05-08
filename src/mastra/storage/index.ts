/**
 * @file storage.ts
 * Central storage configuration for Mastra that can be shared across all agents.
 * Uses the basic LibSQLStore implementation without vector search or advanced features.
 */
import { LibSQLStore } from "@mastra/libsql";

// Create a shared storage instance for all agents
export const storage = new LibSQLStore({
  url: "file:./local.db", // Relative path from bundled .mastra/output dir
});
