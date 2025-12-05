package com.travel.Travel.service;

import com.travel.Travel.entity.Landscape;
import com.travel.Travel.entity.Tourist;
import com.travel.Travel.entity.TravelPackage;
import com.travel.Travel.repository.TouristRepository;
import com.travel.Travel.repository.TravelPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RecommendationService {

    @Autowired
    private TravelPackageRepository packageRepo;

    @Autowired
    private TouristRepository touristRepo;

    //  MAIN RECOMMENDATION FOR A TOURIST
    public List<TravelPackage> recommend(Long touristId) {

        Tourist tourist = touristRepo.findById(touristId)
                .orElseThrow(() -> new RuntimeException("Tourist not found"));

        List<TravelPackage> allPackages = packageRepo.findAll();

        // Map: Package → Score
        Map<TravelPackage, Double> scoreMap = new HashMap<>();

        for (TravelPackage pkg : allPackages) {
            double score = calculateScore(pkg, tourist);

            scoreMap.put(pkg, score);
        }

        // Sort by score DESC
        return scoreMap.entrySet().stream()
                .sorted((a, b) -> Double.compare(b.getValue(), a.getValue()))
                .map(Map.Entry::getKey)
                .toList();
    }


    // SCORE CALCULATION ENGINE
    private double calculateScore(TravelPackage pkg, Tourist tourist) {

        double score = 0;

        // 1. SEASON MATCH (WEIGHT: 20)
        if (pkg.getSeason() != null &&
                pkg.getSeason().equalsIgnoreCase(tourist.getPreferredSeason())) {
            score += 20;
        }

        // 2. PRICE MATCH (WEIGHT: 15)
        double price = pkg.getPrice();
        if (price >= tourist.getPreferredPriceMin() && price <= tourist.getPreferredPriceMax()) {
            score += 15;
        }

        // 3. PACKAGE RATING (WEIGHT: 25)
        if (pkg.getRating() != null) {
            score += pkg.getRating() * 5; // rating 1–5 → 5–25 points
        }

        // 4. LANDSCAPE MATCH WITH USER INTERESTS (WEIGHT: 25)
        for (Landscape ls : pkg.getLandscapes()) {

            // Category matches user interests (Adventure, Nature, Culture etc.)
            if (tourist.getInterests() != null &&
                    tourist.getInterests().contains(ls.getCategory())) {
                score += 10;
            }

            // Best time to visit matches season preference
            if (ls.getSeason() != null &&
                    ls.getSeason().equalsIgnoreCase(tourist.getPreferredSeason())) {
                score += 5;
            }

            // Landscape rating (1-5)
            if (ls.getRating() != null) {
                score += ls.getRating() * 2;
            }

            // Popularity
            if (ls.getPopularity() != null) {
                score += Math.min(ls.getPopularity(), 10); // cap at 10
            }

            // Crowd preference
            if (tourist.getPrefersCrowdedPlaces() != null && ls.getIsCrowdedPlace() != null) {
                if (tourist.getPrefersCrowdedPlaces().equals(ls.getIsCrowdedPlace())) {
                    score += 5;
                }
            }

            // Gender restriction (rare)
            if (ls.getPreferredGender() != null &&
                    (ls.getPreferredGender().equalsIgnoreCase("Any") ||
                            ls.getPreferredGender().equalsIgnoreCase(tourist.getGender()))) {
                score += 3;
            }
        }

        // 5. TRAVEL STYLE MATCH (Luxury / Budget / Adventure)
        if (pkg.getPackageType() != null &&
                pkg.getPackageType().equalsIgnoreCase(tourist.getTravelStyle())) {
            score += 10;
        }

        // 6. BUDGET RANGE MATCH (LOW / MEDIUM / HIGH)
        if (tourist.getBudgetRange() != null) {
            switch (tourist.getBudgetRange()) {
                case "LOW" -> score += (pkg.getPrice() < 5000) ? 10 : 0;
                case "MEDIUM" -> score += (pkg.getPrice() >= 5000 && pkg.getPrice() <= 15000) ? 10 : 0;
                case "HIGH" -> score += (pkg.getPrice() > 15000) ? 10 : 0;
            }
        }

        return score;
    }
}
