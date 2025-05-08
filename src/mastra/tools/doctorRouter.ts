import { createTool } from "@mastra/core/tools";
import { FindDoctorToolInputSchema } from "../schemas";
import { doctorTypes } from "../provider/doctorService";
import { doctorMatchingAgent } from "../agents/doctorMatchingAgent";

/**
 * @file doctorRouter.ts
 * Tool to find appropriate doctors based on a medical diagnosis and symptoms.
 * It directly uses the doctorMatchingAgent to find appropriate specialists.
 */
export const findDoctorsTool = createTool({
  id: "findDoctorsForDiagnosis",
  description:
    "Finds appropriate doctors based on a medical diagnosis, symptoms, and severity. Uses a specialized agent and an in-memory list of doctors categorized by specialty to provide recommendations.",
  inputSchema: FindDoctorToolInputSchema,
  async execute({ context: { diagnosis, symptoms, severity } }) {
    console.log("executing with this context", {
      diagnosis,
      symptoms,
      severity,
    });

    try {
      // Convert doctorTypes to a JSON string to match the agent's expectations
      const doctorTypesJson = JSON.stringify(doctorTypes);

      // Create a message with all the required information
      const message = `Diagnosis: ${diagnosis}\nSymptoms: ${symptoms}\nSeverity: ${severity}\nDoctorTypes: ${doctorTypesJson}`;

      const response = await doctorMatchingAgent.generate([
        { role: "user", content: message },
      ]);
      return response.text;
    } catch (error: any) {
      console.error("Error finding doctors:", error);
      return `Error: Unable to find appropriate doctors at this time. Please try again later. ${error?.message ?? ""}`;
    }
  },
});
