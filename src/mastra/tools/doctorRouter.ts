import { createTool } from "@mastra/core/tools";
import { FindDoctorToolInputSchema } from "../schemas";
import { doctorService } from "../index";

/**
 * @file doctorRouter.ts
 * Tool to find appropriate doctors based on a medical diagnosis and symptoms.
 * It uses the doctorService to find appropriate doctors based on diagnosis.
 */
export const findDoctorsTool = createTool({
  id: "findDoctorsForDiagnosis",
  description:
    "Finds appropriate doctors based on a medical diagnosis, symptoms, and severity. Uses a specialized agent and an in-memory list of doctors categorized by specialty to provide recommendations.",
  inputSchema: FindDoctorToolInputSchema,
  /**
   * Executes the doctor finding logic.
   * @param {object} params - The parameters for the tool.
   * @param {string} params.diagnosis - The medical diagnosis.
   * @param {string} params.symptoms - A description of symptoms.
   * @param {\"low\" | \"medium\" | \"high\" | \"emergency\"} params.severity - The severity of the symptoms.
   * @returns {Promise<string>} A string containing doctor recommendations or an error message.
   */
  async execute({ context: { diagnosis, symptoms, severity } }) {
    console.log("executing with this context", {
      diagnosis,
      symptoms,
      severity,
    });

    // Use the doctor service to find appropriate doctors
    return await doctorService.findDoctors(diagnosis, symptoms, severity);
  },
});
