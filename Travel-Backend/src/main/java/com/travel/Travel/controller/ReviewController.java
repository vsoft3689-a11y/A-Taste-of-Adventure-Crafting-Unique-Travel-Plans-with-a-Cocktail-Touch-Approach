package com.travel.Travel.controller;

import com.travel.Travel.entity.Review;
import com.travel.Travel.repository.ReviewRepository;
import com.travel.Travel.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewRepository reviewRepo;

    @PostMapping("/{touristId}/{packageId}")
    public Review submitReview(
            @PathVariable Long touristId,
            @PathVariable Long packageId,
            @RequestBody Map<String, Object> body
    ) {
        Integer rating = Integer.valueOf(body.get("rating").toString());
        String comment = body.get("comment").toString();

        return reviewService.submitReview(touristId, packageId, rating, comment);
    }

    @GetMapping("/{packageId}")
    public List<Review> getReviews(@PathVariable Long packageId) {
        return reviewRepo.findByTravelPackageId(packageId);
    }
}

