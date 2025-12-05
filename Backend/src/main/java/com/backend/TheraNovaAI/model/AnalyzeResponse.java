package com.backend.TheraNovaAI.model;

import java.util.List;

public class AnalyzeResponse {

    private String molecule;
    private String disease;
    private double repurposeScore;
    private String overallVerdict;
    private List<TrialSummary> trials;
    private List<CompetitorSummary> competitors;
    private List<String> evidenceHighlights;
    private String analysisId;

    public String getMolecule() {
        return molecule;
    }

    public void setMolecule(String molecule) {
        this.molecule = molecule;
    }

    public String getDisease() {
        return disease;
    }

    public void setDisease(String disease) {
        this.disease = disease;
    }

    public double getRepurposeScore() {
        return repurposeScore;
    }

    public void setRepurposeScore(double repurposeScore) {
        this.repurposeScore = repurposeScore;
    }

    public String getOverallVerdict() {
        return overallVerdict;
    }

    public void setOverallVerdict(String overallVerdict) {
        this.overallVerdict = overallVerdict;
    }

    public List<TrialSummary> getTrials() {
        return trials;
    }

    public void setTrials(List<TrialSummary> trials) {
        this.trials = trials;
    }

    public List<CompetitorSummary> getCompetitors() {
        return competitors;
    }

    public void setCompetitors(List<CompetitorSummary> competitors) {
        this.competitors = competitors;
    }

    public List<String> getEvidenceHighlights() {
        return evidenceHighlights;
    }

    public void setEvidenceHighlights(List<String> evidenceHighlights) {
        this.evidenceHighlights = evidenceHighlights;
    }

    public String getAnalysisId() {
        return analysisId;
    }

    public void setAnalysisId(String analysisId) {
        this.analysisId = analysisId;
    }
}
