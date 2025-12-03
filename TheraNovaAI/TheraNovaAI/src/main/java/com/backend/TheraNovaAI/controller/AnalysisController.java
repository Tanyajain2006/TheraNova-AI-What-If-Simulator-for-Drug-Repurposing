package com.backend.TheraNovaAI.controller;

import com.backend.TheraNovaAI.model.AnalyzeRequest;
import com.backend.TheraNovaAI.model.AnalyzeResponse;
import com.backend.TheraNovaAI.model.SavedAnalysisEntity;
import com.backend.TheraNovaAI.service.AnalysisService;
import com.backend.TheraNovaAI.service.MLClient;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")   // allow frontend access
public class AnalysisController {

    private final MLClient mlClient;
    private final AnalysisService analysisService;

    public AnalysisController(MLClient mlClient, AnalysisService analysisService) {
        this.mlClient = mlClient;
        this.analysisService = analysisService;
    }

    @GetMapping("/health")
    public String health() {
        return "Backend running successfully!";
    }

    @PostMapping("/analyze")
    public AnalyzeResponse analyze(@RequestBody AnalyzeRequest request) {

        if (request.getMolecule() == null || request.getDisease() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Molecule + Disease required");
        }

        // Call Python ML microservice
        AnalyzeResponse resp = mlClient.callMLService(request);

        // Fallback / extra verdict logic (if ML only returns score)
        double score = resp.getRepurposeScore();
        if (score > 0.8) {
            resp.setOverallVerdict("Strong candidate for repurposing.");
        } else if (score > 0.5) {
            resp.setOverallVerdict("Promising – further validation required.");
        } else {
            resp.setOverallVerdict("Low repurposing priority at this stage.");
        }

        return resp;
    }

    @PostMapping("/analyses")
    public SavedAnalysisEntity save(@RequestBody AnalyzeResponse response) {
        return analysisService.save(response);
    }

    @GetMapping("/analyses")
    public List<SavedAnalysisEntity> list() {
        return analysisService.getAll();
    }
}
