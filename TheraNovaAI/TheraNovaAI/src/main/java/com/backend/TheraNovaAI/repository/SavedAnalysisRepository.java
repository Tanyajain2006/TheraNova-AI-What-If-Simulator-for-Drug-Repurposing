package com.backend.TheraNovaAI.repository;

import com.backend.TheraNovaAI.model.SavedAnalysisEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedAnalysisRepository extends JpaRepository<SavedAnalysisEntity, String> {
}
