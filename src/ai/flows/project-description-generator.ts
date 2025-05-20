'use server';

/**
 * @fileOverview AI-powered tool to generate personalized project descriptions.
 *
 * - generateProjectDescription - A function that handles the project description generation process.
 * - ProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - ProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectDescriptionInputSchema = z.object({
  projectName: z.string().describe('The name of the project.'),
  techStack: z.string().describe('The tech stack used in the project (e.g., React, Node.js, TypeScript).'),
  keywords: z.string().describe('Keywords related to the project (e.g., responsive, AI, e-commerce).'),
  projectSummary: z.string().describe('A summary of the project.'),
});
export type ProjectDescriptionInput = z.infer<typeof ProjectDescriptionInputSchema>;

const ProjectDescriptionOutputSchema = z.object({
  description: z.string().describe('A personalized project description.'),
});
export type ProjectDescriptionOutput = z.infer<typeof ProjectDescriptionOutputSchema>;

export async function generateProjectDescription(input: ProjectDescriptionInput): Promise<ProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'projectDescriptionPrompt',
  input: {schema: ProjectDescriptionInputSchema},
  output: {schema: ProjectDescriptionOutputSchema},
  prompt: `You are an AI assistant helping developers create compelling project descriptions for their portfolios.

  Based on the project's name, tech stack, keywords, and summary, generate a personalized and engaging project description.

  Project Name: {{{projectName}}}
  Tech Stack: {{{techStack}}}
  Keywords: {{{keywords}}}
  Summary: {{{projectSummary}}}

  Write a description that highlights the project's key features, technologies used, and its impact or results. The description should be concise and easy to read.
  `,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: ProjectDescriptionInputSchema,
    outputSchema: ProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
