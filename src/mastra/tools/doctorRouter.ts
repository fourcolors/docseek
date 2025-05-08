import { tool } from "ai";
import { z } from "zod";
import mockDoctors from "~/data/mock_doctors.json";

/**
 * Tool for routing a patient to the right doctor based on symptom and location.
 * Loads doctors from a mock JSON file and matches by symptom and (optionally) location.
 * @module doctorRouter
 */
export const doctorRouter = tool({
  description:
    "Route a patient to the right doctor based on their symptom and (optionally) location.",
  parameters: z.object({
    symptom: z.string().describe("The main symptom to match with a doctor"),
    location: z
      .string()
      .optional()
      .describe("Optional location to filter doctors"),
  }),
  /**
   * Executes the doctor routing logic.
   * @param symptom - Symptom to match
   * @param location - Optional location
   * @returns {Promise<{doctor?: object, reason: string}>} Matching doctor and reason
   */
  async execute({ symptom, location }: { symptom: string; location?: string }) {
    // Inline schema for doctor
    const DoctorSchema = z.object({
      id: z.string(),
      name: z.string(),
      specialty: z.string(),
      symptoms: z.array(z.string()),
      location: z.string(),
      contact: z.string(),
    });
    // Load doctors from JSON
    const doctors = z.array(DoctorSchema).parse(mockDoctors);

    // Find doctor
    const doctor = doctors.find(
      (doc) =>
        doc.symptoms
          .map((s) => s.toLowerCase())
          .includes(symptom.toLowerCase()) &&
        (!location || doc.location.toLowerCase() === location.toLowerCase())
    );

    if (doctor) {
      return {
        doctor,
        reason: `Matched doctor for symptom '${symptom}'${location ? ` in ${location}` : ""}.`,
      };
    }
    return {
      doctor: undefined,
      reason: `No doctor found for symptom '${symptom}'${location ? ` in ${location}` : ""}.`,
    };
  },
});
