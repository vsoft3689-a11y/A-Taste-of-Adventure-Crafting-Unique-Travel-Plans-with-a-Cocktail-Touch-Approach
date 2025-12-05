package com.travel.Travel.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Tourist {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // full name
    private String email; // unique
    private Double preferredPriceMin; // lower limit
    private Double preferredPriceMax; // upper limit
    private String preferredSeason; // Summer, Winter, Monsoon
    private String address; // city or locality
    private String contact; // phone number
    @ElementCollection
    private Set<String> interests; // Adventure, Nature, Culture, Food, Trekking
    private Integer age; // in years
    private String gender; // Male, Female, Other
    private String travelFrequency; // Rare, Often, Very Often
    private String budgetRange;     // LOW, MEDIUM, HIGH
    private String travelStyle;  // Luxury, Budget, Adventure
    private String foodPreference; // Veg, Non-veg, Vegan
    private Boolean prefersCrowdedPlaces; // true or false
}
