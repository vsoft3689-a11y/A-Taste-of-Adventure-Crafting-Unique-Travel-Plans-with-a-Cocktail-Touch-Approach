package com.travel.Travel.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class AdminPackageRequest {
    private String title;
    private String description;
    private Double price;
    private Integer durationDays;
    private String season;
    private Boolean active;

    private Double rating;
    private Integer maxPeople;
    private Integer minPeople;
    private LocalDate availableFrom;
    private LocalDate availableTo;
    private String packageType;
    private String inclusions;
    private String exclusions;

    private List<Long> landscapeIds;
}
