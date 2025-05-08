import { z } from "zod";

/**
 * Schema for doctor finding tool input parameters
 */
export const FindDoctorToolInputSchema = z.object({
  diagnosis: z
    .string()
    .describe(
      "The medical diagnosis determined from symptoms (e.g., 'suspected flu', 'migraine with aura')",
    ),
  symptoms: z
    .string()
    .describe(
      "A detailed description of the patient's symptoms (e.g., 'high fever, body aches, persistent cough')",
    ),
  severity: z
    .enum(["low", "medium", "high", "emergency"])
    .default("medium")
    .describe(
      "The perceived severity of the symptoms (low, medium, high, emergency)",
    ),
});

/**
 * Type for severity levels
 */
export type SeverityLevel = z.infer<
  typeof FindDoctorToolInputSchema
>["severity"];

/**
 * Type for doctor finding parameters
 */
export type FindDoctorParams = z.infer<typeof FindDoctorToolInputSchema>;
