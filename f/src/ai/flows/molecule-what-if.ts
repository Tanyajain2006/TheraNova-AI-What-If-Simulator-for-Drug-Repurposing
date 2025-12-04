'use server';

/**
 * @fileOverview Implements the Molecule "What-If" Simulator flow.
 *
 * Allows users to input a molecule and a disease to instantly see a generated hypothetical innovation case,
 * including mechanism of action, trial history, competitor filings, and market size, so they can quickly assess repurposing potential.
 *
 * @exports moleculeWhatIf - The main function to trigger the flow.
 * @exports MoleculeWhatIfInput - The input type for the moleculeWhatIf function.
 * @exports MoleculeWhatIfOutput - The return type for the moleculeWhatIf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoleculeWhatIfInputSchema = z.object({
  molecule: z.string().describe('The name of the molecule.'),
  disease: z.string().describe('The name of the disease.'),
});
export type MoleculeWhatIfInput = z.infer<typeof MoleculeWhatIfInputSchema>;

const MoleculeWhatIfOutputSchema = z.object({
  innovationCase: z.string().describe('A hypothetical innovation case, including mechanism of action, trial history, competitor filings, and market size.'),
});
export type MoleculeWhatIfOutput = z.infer<typeof MoleculeWhatIfOutputSchema>;

export async function moleculeWhatIf(input: MoleculeWhatIfInput): Promise<MoleculeWhatIfOutput> {
  return moleculeWhatIfFlow(input);
}

const moleculeWhatIfPrompt = ai.definePrompt({
  name: 'moleculeWhatIfPrompt',
  input: {schema: MoleculeWhatIfInputSchema},
  output: {schema: MoleculeWhatIfOutputSchema},
  prompt: `You are an AI assistant for pharmaceutical research.
  Given a molecule and a disease, generate a hypothetical innovation case including mechanism of action, trial history, competitor filings, and market size.

Molecule: {{{molecule}}}
Disease: {{{disease}}}

Innovation Case:`,
});

const moleculeWhatIfFlow = ai.defineFlow(
  {
    name: 'moleculeWhatIfFlow',
    inputSchema: MoleculeWhatIfInputSchema,
    outputSchema: MoleculeWhatIfOutputSchema,
  },
  async input => {
    const {output} = await moleculeWhatIfPrompt(input);
    return output!;
  }
);
