"use server";

import { z } from "zod";
import { moleculeWhatIf, MoleculeWhatIfOutput } from "@/ai/flows/molecule-what-if";
import { surfaceHiddenOffLabelSignals, SurfaceHiddenOffLabelSignalsOutput } from "@/ai/flows/surface-hidden-off-label-signals";
import { alertOnCompetitorFilings, AlertOnCompetitorFilingsOutput } from "@/ai/flows/alert-on-competitor-filings";

const simulatorSchema = z.object({
  molecule: z.string().min(2, "Molecule name is required."),
  disease: z.string().min(2, "Disease name is required."),
});

const repurposeBotSchema = z.object({
  moleculeName: z.string().min(2, "Molecule name is required."),
});

const radarSchema = z.object({
  moleculeName: z.string().min(2, "Molecule name is required."),
  competitorName: z.string().min(2, "Competitor name is required."),
  filingType: z.enum(['trial', 'patent']),
});


export async function runMoleculeSimulator(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: MoleculeWhatIfOutput | null; error: string | null; }> {
  try {
    const validatedFields = simulatorSchema.safeParse({
      molecule: formData.get("molecule"),
      disease: formData.get("disease"),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed",
        data: null,
        error: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    // In a real app, you would call the Genkit flow.
    // For this example, we'll return mock data to simulate the AI response.
    // const result = await moleculeWhatIf(validatedFields.data);
    
    const result: MoleculeWhatIfOutput = {
      innovationCase: `**Mechanism of Action:** ${validatedFields.data.molecule} is hypothesized to modulate the XYZ pathway, which is implicated in the pathophysiology of ${validatedFields.data.disease}. This could potentially reduce inflammation and slow disease progression.\n\n**Trial History:** No direct trials of ${validatedFields.data.molecule} for ${validatedFields.data.disease} have been conducted. However, related compounds have shown promise in pre-clinical models.\n\n**Competitor Filings:** InnovatePharma recently filed a patent for a similar compound targeting the XYZ pathway for autoimmune disorders. Phase I trials are expected to begin in Q4.\n\n**Market Size:** The estimated market for ${validatedFields.data.disease} treatments is $5 billion annually, with a projected CAGR of 8%.`,
    };

    return { message: "Simulation complete", data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { message: "An unexpected error occurred", data: null, error: e.message || "Unknown error" };
  }
}

export async function runRepurposeBot(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: SurfaceHiddenOffLabelSignalsOutput | null; error: string | null; }> {
  try {
    const validatedFields = repurposeBotSchema.safeParse({
      moleculeName: formData.get("moleculeName"),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed",
        data: null,
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Mock response
    const result: SurfaceHiddenOffLabelSignalsOutput = {
      offLabelSignals: [
        { source: "Patient Forum (HealthUnlocked)", signal: "Reported improvement in joint stiffness for patients with early-stage osteoarthritis.", evidence: "Multiple anecdotal reports from users over the past 6 months." },
        { source: "Guideline Update (NICE)", signal: "Mentioned as a potential area for future research in fibromyalgia management.", evidence: "NICE Guideline NG193, Appendix A: Research Recommendations." },
        { source: "Observational Study (JMIR)", signal: "Retrospective analysis of patient-reported outcomes showed a correlation between use of ${validatedFields.data.moleculeName} and reduced migraine frequency.", evidence: "doi:10.2196/12345" },
      ]
    };
    
    return { message: "Analysis complete", data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { message: "An unexpected error occurred", data: null, error: e.message || "Unknown error" };
  }
}

export async function runInnovationRadar(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: AlertOnCompetitorFilingsOutput | null; error: string | null; }> {
  try {
    const validatedFields = radarSchema.safeParse({
      moleculeName: formData.get("moleculeName"),
      competitorName: formData.get("competitorName"),
      filingType: formData.get("filingType"),
    });

    if (!validatedFields.success) {
      return {
        message: "Validation failed",
        data: null,
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Mock response
    const result: AlertOnCompetitorFilingsOutput = {
        alertMessage: `New ${validatedFields.data.filingType} filing detected for competitor ${validatedFields.data.competitorName} in the ${validatedFields.data.moleculeName} space. The filing (ID: NCT12345678) outlines a Phase II study for a novel formulation.`,
        filingLink: "https://clinicaltrials.gov/ct2/show/NCT04518874"
    };

    return { message: "Alert set successfully", data: result, error: null };
  } catch (e: any) {
    console.error(e);
    return { message: "An unexpected error occurred", data: null, error: e.message || "Unknown error" };
  }
}
