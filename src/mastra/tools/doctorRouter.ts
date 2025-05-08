import { createTool } from "@mastra/core/tools";
import { FindDoctorToolInputSchema } from "../schemas";

export type DoctorTypesMap = {
  [specialty: string]: string[];
};

// In-memory doctor data as per user's example
const doctorTypes: DoctorTypesMap = {
  cardiology: ["Dr. Lee (Heart Specialist)", "Dr. Wong (Cardiovascular)"],
  dermatology: ["Dr. Tan (Skin Specialist)", "Dr. Chen (Dermatology)"],
  neurology: ["Dr. Lim (Neurologist)", "Dr. Singh (Brain Specialist)"],
  orthopedics: ["Dr. Kumar (Bone Specialist)", "Dr. Patel (Joint Care)"],
  general: ["Dr. Ng (General Practitioner)", "Dr. Sharma (Family Medicine)"],
};

/**
 * @file doctorRouter.ts
 * Tool to find appropriate doctors based on a medical diagnosis and symptoms.
 * It uses an in-memory doctor list (doctorTypes) and the doctorMatchingAgent
 * to get recommendations.
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
    // TODO: Implement doctor finding logic
    return "No doctors found";
  },
});
