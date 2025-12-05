'use server';
/**
 * @fileOverview This file implements the AlertOnCompetitorFilings flow, which notifies strategy team members of competitor filings related to specific molecules.
 *
 * - alertOnCompetitorFilings - A function that triggers the competitor filing alert process.
 * - AlertOnCompetitorFilingsInput - The input type for the alertOnCompetitorFilings function.
 * - AlertOnCompetitorFilingsOutput - The return type for the alertOnCompetitorFilings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlertOnCompetitorFilingsInputSchema = z.object({
  moleculeName: z.string().describe('The name of the molecule to monitor.'),
  competitorName: z.string().describe('The name of the competitor to watch for.'),
  filingType: z.enum(['trial', 'patent']).describe('The type of filing to monitor (trial or patent).'),
});
export type AlertOnCompetitorFilingsInput = z.infer<typeof AlertOnCompetitorFilingsInputSchema>;

const AlertOnCompetitorFilingsOutputSchema = z.object({
  alertMessage: z.string().describe('A message describing the competitor filing.'),
  filingLink: z.string().url().optional().describe('A link to the competitor filing, if available.'),
});
export type AlertOnCompetitorFilingsOutput = z.infer<typeof AlertOnCompetitorFilingsOutputSchema>;

export async function alertOnCompetitorFilings(input: AlertOnCompetitorFilingsInput): Promise<AlertOnCompetitorFilingsOutput> {
  return alertOnCompetitorFilingsFlow(input);
}

const alertPrompt = ai.definePrompt({
  name: 'alertOnCompetitorFilingsPrompt',
  input: {schema: AlertOnCompetitorFilingsInputSchema},
  output: {schema: AlertOnCompetitorFilingsOutputSchema},
  prompt: `A competitor, {{{competitorName}}}, has filed a new {{{filingType}}} related to the molecule {{{moleculeName}}}.\n\nProvide a brief summary of the filing and a link to the filing, if available.`,
});

const alertOnCompetitorFilingsFlow = ai.defineFlow(
  {
    name: 'alertOnCompetitorFilingsFlow',
    inputSchema: AlertOnCompetitorFilingsInputSchema,
    outputSchema: AlertOnCompetitorFilingsOutputSchema,
  },
  async input => {
    const {output} = await alertPrompt(input);
    return output!;
  }
);
