package com.travel.Travel.repository;

import com.travel.Travel.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByTravelPackageId(Long packageId);

    boolean existsByTouristIdAndTravelPackageId(Long touristId, Long packageId);
}

