package com.backend.TheraNovaAI.service;

import com.backend.TheraNovaAI.model.AnalyzeResponse;
import com.backend.TheraNovaAI.model.SavedAnalysisEntity;
import com.backend.TheraNovaAI.repository.SavedAnalysisRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalysisService {

    private final SavedAnalysisRepository savedAnalysisRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AnalysisService(SavedAnalysisRepository savedAnalysisRepository) {
        this.savedAnalysisRepository = savedAnalysisRepository;
    }

    public SavedAnalysisEntity save(AnalyzeResponse response) {
        try {
            // store full response as JSON string in DB
            String json = objectMapper.writeValueAsString(response);
            SavedAnalysisEntity entity =
                    new SavedAnalysisEntity(response.getAnalysisId(), json);
            return savedAnalysisRepository.save(entity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save analysis", e);
        }
    }

    public List<SavedAnalysisEntity> getAll() {
        return savedAnalysisRepository.findAll();
    }
}
