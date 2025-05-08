# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## IMPORTANT GUIDELINES

When working with this codebase:

1. **Always research before implementing**: Before making any changes, thoroughly research the official documentation for the technologies being used (e.g., Mastra, TypeScript, etc.). Do not implement solutions based solely on error messages or assumptions.

2. **Verify implementations**: Test your changes against the documentation to ensure correctness. Don't assume implementation details based on partial information.

3. **Respect existing patterns**: Follow the established code patterns in the repository, especially for key framework features like memory, storage, and agent configuration.

4. **Check for TypeScript errors after each change**: Run TypeScript checks after each modification to ensure no new errors are introduced. Never commit or consider a task complete without verifying the code is TypeScript-error-free.

5. **Incremental changes**: Make changes incrementally and validate after each step rather than making multiple large changes at once.

## Using the "Think" Tool

When working on complex tasks or problems, use the "think" tool to break down your reasoning process. This provides a structured space to work through problems methodically before implementing solutions. Use the following format:

```
<think_step_1>
- Define the problem or task requirements
- List the key components or variables involved
- Identify any constraints or edge cases
</think_step_1>

<think_step_2>
- Explore possible approaches or solutions
- Evaluate each approach against the requirements
- Consider the pros and cons of each approach
</think_step_2>

<think_step_3>
- Select the best approach based on requirements and constraints
- Break down the implementation into specific steps
- Identify any potential issues or challenges
</think_step_3>

<think_step_4>
- Plan the specific implementation details
- Consider how the implementation integrates with existing code
- Verify the approach against TypeScript type safety
</think_step_4>
```

This step-by-step thinking approach should be used especially for:
- Complex feature implementations
- Bug fixes requiring deep analysis
- Architectural decisions
- Performance optimizations
- API integrations

Use as many or as few steps as needed, but maintain the structured format to ensure thorough and methodical problem-solving.

## Project Overview

DocSeek is an AI-powered medical agent application built with the Mastra framework. The application provides:

- A medical diagnosis agent that can understand user symptoms
- A doctor router tool that matches patients with appropriate doctors based on symptoms
- A doctor matching agent that recommends specialists based on diagnoses
- Integration with OpenAI's API for natural language processing

## Development Commands

- `pnpm dev` or `npm run dev` - Start the development server with Mastra
- `pnpm install` or `npm install` - Install project dependencies
- `pnpm lint` or `npm run lint` - Check for linting issues (if configured)
- `pnpm typecheck` or `npm run typecheck` - Check TypeScript types (if configured)

## Project Structure

- `/src/mastra`: Main application code
  - `/agents`: Contains agent definitions
    - `medicalAgent.ts`: Main diagnostic agent that interacts with users
    - `doctorMatchingAgent.ts`: Specialized agent for matching diagnoses to doctors
  - `/tools`: Tools used by the agents
    - `doctorRouter.ts`: Routes patients to appropriate doctors based on diagnosis
    - `index.ts`: Contains the weatherTool implementation
  - `/workflows`: Workflow definitions
    - `index.ts`: Contains the weather workflow implementation
- `/src/data`: Mock data storage (contains doctor information)

## Architecture

The project is built using the Mastra framework and consists of:

1. **Agents**: 
   - `diagnosticAgent`: Acts as a medical assistant to understand symptoms and form preliminary diagnoses
   - `doctorMatchingAgent`: Specialized agent that maps diagnoses to medical specialties and doctors

2. **Tools**: 
   - `findDoctorsTool`: Uses in-memory doctor data and the doctorMatchingAgent to match patients with doctors
   - `weatherTool`: Retrieves weather information (included but not currently integrated with the medical agent)

3. **Data Management**:
   - Uses in-memory data structures for doctor information
   - The doctor data is structured by medical specialty categories

4. **Workflows**:
   - `weatherWorkflow`: Fetches weather forecasts and suggests activities (not integrated with medical functionality)

5. **Technology Stack**:
   - TypeScript
   - Mastra Framework
   - OpenAI API (GPT-4o)
   - Zod for schema validation

## Key Concepts

1. **Agent Communication**:
   - The main diagnostic agent collects symptoms from users
   - The doctor matching agent specializes in mapping diagnoses to doctor specialties

2. **Tool Integration**:
   - Tools are registered with agents to extend their capabilities
   - The findDoctorsTool connects the main diagnostic agent with the doctor matching agent

3. **Conversation Flow**:
   - Diagnostic agent collects symptoms from users
   - Forms a preliminary diagnosis based on symptoms
   - Uses the findDoctorsTool to match the diagnosis with appropriate doctors
   - Returns doctor recommendations to the user

## Code Patterns

1. **Agent Pattern**:
   ```typescript
   const diagnosticAgent = new Agent({
     name: "medical-diagnostic-assistant",
     system: `...`, // System instructions that define agent behavior
     tools: { findDoctorsTool }, // Tools available to this agent
   });
   ```

2. **Tool Pattern**:
   ```typescript
   const findDoctorsTool = createTool({
     id: "findDoctorsForDiagnosis",
     description: "...",
     parameters: z.object({
       // Zod schema defining input parameters
     }),
     async execute({ context: { diagnosis, symptoms, severity } }) {
       // Logic to execute the tool
     },
   });
   ```

3. **Workflow Pattern**:
   ```typescript
   const weatherWorkflow = new Workflow({
     name: "weather-workflow",
     triggerSchema: z.object({
       // Schema for triggering the workflow
     }),
   })
     .step(fetchWeather)
     .then(planActivities);
   ```

## Current Tasks

There is an ongoing task to simplify the doctorRouter.ts file, which should:

- Reduce duplication in schemas/types
- Consider extracting file loading to a helper
- Potentially merge doctor finding/routing into one function
- Maintain Zod validation, JSDoc comments, and type safety
- Review at least 3-5 options for simplification before choosing the best approach

## Agent Communication Model

The application uses a two-agent approach to medical diagnosis:

1. The diagnosticAgent acts as the front-end, interacting with users to collect symptoms
2. The doctorMatchingAgent acts as a specialized backend service that matches diagnoses to doctor specialties

The communication flow is:
- User -> diagnosticAgent -> findDoctorsTool -> doctorMatchingAgent -> findDoctorsTool -> diagnosticAgent -> User

This design allows the diagnostic agent to focus on symptom collection and preliminary diagnosis, while the matching agent specializes in medical specialty determination.