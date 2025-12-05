package com.travel.Travel.service;

import com.travel.Travel.entity.Landscape;
import com.travel.Travel.entity.Review;
import com.travel.Travel.entity.Tourist;
import com.travel.Travel.entity.TravelPackage;
import com.travel.Travel.repository.LandscapeRepository;
import com.travel.Travel.repository.ReviewRepository;
import com.travel.Travel.repository.TravelPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepo;

    @Autowired
    private TravelPackageRepository pkgRepo;

    @Autowired
    private LandscapeRepository landscapeRepo;

    public Review submitReview(Long touristId, Long packageId, Integer rating, String comment) {

        // Prevent duplicate review
        if (reviewRepo.existsByTouristIdAndTravelPackageId(touristId, packageId)) {
            throw new RuntimeException("You have already reviewed this package.");
        }

        TravelPackage pkg = pkgRepo.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        Review rev = new Review();
        rev.setRating(rating);
        rev.setComment(comment);
        rev.setDate(LocalDate.now());

        Tourist t = new Tourist();
        t.setId(touristId);

        rev.setTourist(t);
        rev.setTravelPackage(pkg);

        Review saved = reviewRepo.save(rev);

        // Update package rating
        updatePackageRating(packageId);

        // Update landscape ratings inside the package
        updateLandscapeRatings(pkg);

        return saved;
    }

    // UPDATE AVERAGE PACKAGE RATING
    public void updatePackageRating(Long packageId) {
        List<Review> reviews = reviewRepo.findByTravelPackageId(packageId);

        double avg = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        TravelPackage pkg = pkgRepo.findById(packageId).orElseThrow();
        pkg.setRating(avg);
        pkgRepo.save(pkg);
    }

    // UPDATE LANDSCAPE RATINGS
    private void updateLandscapeRatings(TravelPackage pkg) {

        // Collect all reviews for this package
        List<Review> reviews = reviewRepo.findByTravelPackageId(pkg.getId());

        // For each landscape inside this package
        for (Landscape landscape : pkg.getLandscapes()) {

            // Compute avg rating for this landscape
            double avg = reviews.stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);

            landscape.setRating(avg);
            landscapeRepo.save(landscape);
        }
    }
}
