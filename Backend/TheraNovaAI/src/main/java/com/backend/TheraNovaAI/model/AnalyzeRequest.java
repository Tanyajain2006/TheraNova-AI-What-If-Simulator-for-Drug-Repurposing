package com.backend.TheraNovaAI.model;

public class AnalyzeRequest {
    private String molecule;
    private String disease;

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
}
