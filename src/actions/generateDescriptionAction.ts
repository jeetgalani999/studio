'use server';

import { generateProjectDescription, type ProjectDescriptionInput, type ProjectDescriptionOutput } from '@/ai/flows/project-description-generator';

export async function generateDescriptionAction(input: ProjectDescriptionInput): Promise<ProjectDescriptionOutput | { error: string }> {
  try {
    // Validate input here if necessary, though Zod in the flow should handle it.
    if (!input.projectName || !input.techStack || !input.keywords || !input.projectSummary) {
        return { error: "All fields are required." };
    }
    const result = await generateProjectDescription(input);
    return result;
  } catch (e: any) {
    console.error("Error generating project description:", e);
    // Check if the error object has a message property
    const errorMessage = e.message || "An unknown error occurred during description generation.";
    return { error: `Failed to generate description: ${errorMessage}` };
  }
}
