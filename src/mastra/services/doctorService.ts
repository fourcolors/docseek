/**
 * @file doctorService.ts
 * Service for managing doctor data and communication with doctor matching agent.
 */

import { SeverityLevel } from "../schemas";

// Extended agent interface to match what's in index.ts
interface ExtendedAgent {
  createThread: () => Promise<{
    sendUserMessage: (message: string) => Promise<{ content: string }>;
  }>;
}

export class DoctorService {
  private doctorMatchingAgent: ExtendedAgent;
  private doctorTypes: DoctorTypesMap;

  constructor(doctorMatchingAgent: any) {
    this.doctorMatchingAgent = doctorMatchingAgent as ExtendedAgent;
    this.doctorTypes = {
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
  }

  /**
   * Find appropriate doctors based on diagnosis, symptoms, and severity
   * @param diagnosis The medical diagnosis
   * @param symptoms The symptoms description
   * @param severity The severity level
   * @returns A string containing doctor recommendations
   */
  async findDoctors(
    diagnosis: string,
    symptoms: string,
    severity: SeverityLevel,
  ): Promise<string> {
    try {
      // Create a thread for communication with the doctorMatchingAgent
      const thread = await this.doctorMatchingAgent.createThread();

      // Convert doctorTypes to a JSON string to match the agent's expectations
      const doctorTypesJson = JSON.stringify(this.doctorTypes);

      // Send the message to the doctor matching agent with all required data
      const response = await thread.sendUserMessage(
        `Diagnosis: ${diagnosis}\nSymptoms: ${symptoms}\nSeverity: ${severity}\nDoctorTypes: ${doctorTypesJson}`,
      );

      // Get the response from the agent
      return response.content;
    } catch (error: any) {
      console.error("Error finding doctors:", error);
      return `Error: Unable to find appropriate doctors at this time. Please try again later. ${error?.message ?? ""}`;
    }
  }

  /**
   * Get all available doctor types
   * @returns The doctor types map
   */
  getDoctorTypes(): DoctorTypesMap {
    return this.doctorTypes;
  }
}

export type DoctorTypesMap = {
  [specialty: string]: string[];
};
