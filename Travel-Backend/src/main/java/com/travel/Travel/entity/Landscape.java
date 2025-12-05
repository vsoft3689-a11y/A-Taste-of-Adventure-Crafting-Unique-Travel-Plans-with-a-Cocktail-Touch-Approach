package com.travel.Travel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Landscape {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;        // name of the place
    private String city;      // city or locality
    @Column(columnDefinition = "TEXT")
    private String description; // detailed info
    @Column(columnDefinition = "TEXT")
    private String imageUrl;  // URL to an image
    private String season;      // Summer, Winter, Monsoon
    private String category;      // Beach, Temple, Waterfall, Adventure, Hill Station, Wildlife
    private Double rating;        // user rating 1–5
    private Integer popularity;   // number of visits
    private Double latitude;      // for map
    private Double longitude;     // for map
    private Double averageCost;   // entry fee or expected cost
    private String bestTimeToVisit; // Morning, Evening, Night
    private String precautions;  // any safety tips
    private String contactInfo; // phone or email
    private String Timings;     // opening and closing times
    private String preferredAgeGroup; // Kids, Adults, Seniors
    private String preferredGender;   // Male, Female, Any
    private Boolean isCrowdedPlace; // true or false
}
