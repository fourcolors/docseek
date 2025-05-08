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
      cardiology: ["Dr. Lee (Heart Specialist)", "Dr. Wong (Cardiovascular)"],
      dermatology: ["Dr. Tan (Skin Specialist)", "Dr. Chen (Dermatology)"],
      neurology: ["Dr. Lim (Neurologist)", "Dr. Singh (Brain Specialist)"],
      orthopedics: ["Dr. Kumar (Bone Specialist)", "Dr. Patel (Joint Care)"],
      general: [
        "Dr. Ng (General Practitioner)",
        "Dr. Sharma (Family Medicine)",
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
