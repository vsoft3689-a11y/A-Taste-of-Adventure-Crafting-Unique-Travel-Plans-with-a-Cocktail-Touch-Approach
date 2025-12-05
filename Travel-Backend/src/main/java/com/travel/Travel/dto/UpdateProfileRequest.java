package com.travel.Travel.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String preferredSeason;
    private Integer preferredPriceMin;
    private Integer preferredPriceMax;
    private String address;
    private String contact;

}

