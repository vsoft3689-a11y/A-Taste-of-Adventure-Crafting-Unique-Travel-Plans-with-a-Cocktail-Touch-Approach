package com.travel.Travel.controller;

import com.travel.Travel.entity.TravelPackage;
import com.travel.Travel.repository.TravelPackageRepository;
import com.travel.Travel.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicController {
    private final TravelPackageRepository packageRepo;
    private final RecommendationService recommendationService;

    public PublicController(TravelPackageRepository packageRepo, RecommendationService recommendationService) {
        this.packageRepo = packageRepo;
        this.recommendationService = recommendationService;
    }

    @GetMapping("/packages")
    public List<TravelPackage> listPackages(@RequestParam(required = false) String season,
                                            @RequestParam(required = false) String area) {
        return packageRepo.findByActiveTrue();
    }

    @GetMapping("/package/{id}")
    public TravelPackage getPackage(@PathVariable Long id) {
        return packageRepo.findById(id).orElseThrow();
    }

    @GetMapping("/tourist/{id}/recommendations")
    public List<TravelPackage> getRecommendations(@PathVariable Long id) {
        return recommendationService.recommend(id);
    }
}
