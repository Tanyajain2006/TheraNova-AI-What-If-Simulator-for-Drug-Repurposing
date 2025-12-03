package com.backend.TheraNovaAI.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "saved_analysis")
public class SavedAnalysisEntity {

    @Id
    private String id;

    @Lob
    private String jsonData;

    public SavedAnalysisEntity() {
    }

    public SavedAnalysisEntity(String id, String jsonData) {
        this.id = id;
        this.jsonData = jsonData;
    }

    public String getId() {
        return id;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
}
