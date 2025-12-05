package com.backend.TheraNovaAI.service;

import com.backend.TheraNovaAI.model.AnalyzeRequest;
import com.backend.TheraNovaAI.model.AnalyzeResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class MLClient {

    private final WebClient webClient;

    public MLClient(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("http://ml:8000")
                .build();
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
