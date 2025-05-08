/**
 * @file doctorService.ts
 * Service for managing doctor data and communication with doctor matching agent.
 */

import { SeverityLevel } from "../schemas";

export type DoctorTypesMap = {
  [specialty: string]: string[];
};

// Doctor types data - exported separately to avoid circular dependencies
export const doctorTypes: DoctorTypesMap = {
  cardiology: [
    "Dr. Lee (Heart Specialist)",
    "Dr. Wong (Cardiovascular)",
    "Dr. Smith (Interventional Cardiologist)",
    "Dr. Garcia (Electrophysiologist)",
  ],
  dermatology: [
    "Dr. Tan (Skin Specialist)",
    "Dr. Chen (Dermatology)",
    "Dr. Davis (Cosmetic Dermatologist)",
    "Dr. Kim (Pediatric Dermatologist)",
  ],
  neurology: [
    "Dr. Lim (Neurologist)",
    "Dr. Singh (Brain Specialist)",
    "Dr. Rodriguez (Movement Disorder Specialist)",
    "Dr. Brown (Neurophysiologist)",
  ],
  orthopedics: [
    "Dr. Kumar (Bone Specialist)",
    "Dr. Patel (Joint Care)",
    "Dr. Wilson (Spine Surgeon)",
    "Dr. Miller (Sports Medicine)",
  ],
  general: [
    "Dr. Ng (General Practitioner)",
    "Dr. Sharma (Family Medicine)",
    "Dr. Jones (Internal Medicine)",
    "Dr. Walker (Primary Care Physician)",
  ],
  oncology: [
    "Dr. Ivanova (Cancer Specialist)",
    "Dr. Zhang (Radiation Oncologist)",
    "Dr. Williams (Medical Oncologist)",
  ],
  pediatrics: [
    "Dr. Johnson (Child Health Specialist)",
    "Dr. Martinez (Pediatrician)",
    "Dr. Lewis (Adolescent Medicine)",
  ],
  psychiatry: [
    "Dr. Evans (Mental Health Professional)",
    "Dr. Clark (Psychotherapist)",
    "Dr. Roberts (Addiction Psychiatrist)",
  ],
  gastroenterology: [
    "Dr. Adams (Digestive Health)",
    "Dr. Baker (Endoscopy Specialist)",
    "Dr. Green (Hepatologist)",
  ],
  endocrinology: [
    "Dr. Phillips (Hormone Specialist)",
    "Dr. Campbell (Diabetes Care)",
    "Dr. Edwards (Thyroid Expert)",
  ],
  pulmonology: [
    "Dr. Harris (Lung Specialist)",
    "Dr. Young (Respiratory Therapist)",
    "Dr. Allen (Sleep Medicine)",
  ],
  rheumatology: [
    "Dr. Nelson (Arthritis Care)",
    "Dr. Carter (Autoimmune Specialist)",
    "Dr. Mitchell (Connective Tissue Disorders)",
  ],
};

/**
 * Function to process doctor matching
 * This approach avoids circular dependencies by using direct function calls
 * that can be imported anywhere without circular dependencies
 */
export async function matchDoctorsForDiagnosis(
  diagnosis: string,
  symptoms: string,
  severity: SeverityLevel,
  agentFn: (message: string) => Promise<string>
): Promise<string> {
  try {
    // Convert doctorTypes to a JSON string to match the agent's expectations
    const doctorTypesJson = JSON.stringify(doctorTypes);
    
    // Send the message to the doctor matching agent with all required data
    const message = `Diagnosis: ${diagnosis}\nSymptoms: ${symptoms}\nSeverity: ${severity}\nDoctorTypes: ${doctorTypesJson}`;
    
    // Use the provided agent function to get a response
    return await agentFn(message);
  } catch (error: any) {
    console.error("Error finding doctors:", error);
    return `Error: Unable to find appropriate doctors at this time. Please try again later. ${error?.message ?? ""}`;
  }
}
