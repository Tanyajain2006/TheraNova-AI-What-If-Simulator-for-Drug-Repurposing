package com.backend.TheraNovaAI.service;

import com.backend.TheraNovaAI.model.AnalyzeRequest;
import com.backend.TheraNovaAI.model.AnalyzeResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class MLClient {

    private final WebClient webClient;

    // Spring will auto-inject WebClient.Builder (because of WebFlux starter)
    public MLClient(WebClient.Builder builder) {
        // change baseUrl if your ML service runs elsewhere
        this.webClient = builder.baseUrl("http://ml-service:8000").build();
    }

    public AnalyzeResponse callMLService(AnalyzeRequest request) {
        return webClient.post()
                .uri("/score")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AnalyzeResponse.class)
                .block();
    }
}
