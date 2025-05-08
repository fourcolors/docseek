import { createTool } from "@mastra/core/tools";
import { FindDoctorToolInputSchema } from "../schemas";
import { matchDoctorsForDiagnosis } from "../services/doctorService";

// Get reference to the Mastra instance to avoid circular imports
let mastraInstance: any;

// Function to set the Mastra instance from the index file
export function setMastraInstance(instance: any) {
  mastraInstance = instance;
}

/**
 * @file doctorRouter.ts
 * Tool to find appropriate doctors based on a medical diagnosis and symptoms.
 * It uses direct function calls to avoid circular dependencies.
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

    if (!mastraInstance) {
      return "Error: Doctor matching service not initialized. Please try again later.";
    }

    // Function to send a message to the doctor matching agent and get a response
    const agentMessageHandler = async (message: string): Promise<string> => {
      try {
        // Create a thread for communication with the doctorMatchingAgent
        const thread = await mastraInstance.agents.doctorMatchingAgent.createThread();
        
        // Send the message to the agent
        const response = await thread.sendUserMessage(message);
        
        // Return the response content
        return response.content;
      } catch (error: any) {
        console.error("Error communicating with doctor matching agent:", error);
        throw new Error(`Failed to communicate with doctor matching agent: ${error?.message}`);
      }
    };

    // Use the doctor matching function to find appropriate doctors
    return await matchDoctorsForDiagnosis(
      diagnosis, 
      symptoms, 
      severity, 
      agentMessageHandler
    );
  },
});
