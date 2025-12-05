'use server';
/**
 * @fileOverview This file implements the Genkit flow for surfacing hidden off-label signals by analyzing anonymized patient forum posts and guideline updates.
 *
 * - surfaceHiddenOffLabelSignals - A function that handles the process of analyzing data sources to discover potential new uses for existing molecules.
 * - SurfaceHiddenOffLabelSignalsInput - The input type for the surfaceHiddenOffLabelSignals function.
 * - SurfaceHiddenOffLabelSignalsOutput - The return type for the surfaceHiddenOffLabelSignals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SurfaceHiddenOffLabelSignalsInputSchema = z.object({
  moleculeName: z.string().describe('The name of the molecule to analyze.'),
  dataSources: z
    .array(z.string())
    .describe(
      'A list of data sources to analyze, such as patient forums and guideline updates.'
    ),
});
export type SurfaceHiddenOffLabelSignalsInput = z.infer<
  typeof SurfaceHiddenOffLabelSignalsInputSchema
>;

const OffLabelSignalSchema = z.object({
  source: z.string().describe('The data source where the signal was found.'),
  signal: z.string().describe('The description of the off-label signal.'),
  evidence: z.string().describe('Evidence supporting the off-label signal.'),
});

const SurfaceHiddenOffLabelSignalsOutputSchema = z.object({
  offLabelSignals: z.array(OffLabelSignalSchema).describe('A list of off-label signals found.'),
});

export type SurfaceHiddenOffLabelSignalsOutput = z.infer<
  typeof SurfaceHiddenOffLabelSignalsOutputSchema
>;

export async function surfaceHiddenOffLabelSignals(
  input: SurfaceHiddenOffLabelSignalsInput
): Promise<SurfaceHiddenOffLabelSignalsOutput> {
  return surfaceHiddenOffLabelSignalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'surfaceHiddenOffLabelSignalsPrompt',
  input: {schema: SurfaceHiddenOffLabelSignalsInputSchema},
  output: {schema: SurfaceHiddenOffLabelSignalsOutputSchema},
  prompt: `You are an AI assistant that analyzes data from various sources to identify hidden off-label signals for a given molecule.

  Molecule Name: {{{moleculeName}}}
  Data Sources: {{#each dataSources}}{{{this}}}, {{/each}}

  Analyze the provided data sources to identify potential off-label uses for the specified molecule.
  Provide a list of off-label signals, including the source, a description of the signal, and supporting evidence.

  Format the output as a JSON object with an array of offLabelSignals. Each object in the array must contain the source, signal, and evidence.
  `,
});

const surfaceHiddenOffLabelSignalsFlow = ai.defineFlow(
  {
    name: 'surfaceHiddenOffLabelSignalsFlow',
    inputSchema: SurfaceHiddenOffLabelSignalsInputSchema,
    outputSchema: SurfaceHiddenOffLabelSignalsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
