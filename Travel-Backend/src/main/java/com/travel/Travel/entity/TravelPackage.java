package com.travel.Travel.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "travel_package")
@Data
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;          // package name
    @Column(columnDefinition = "TEXT")
    private String description;   // detailed info
    private Double price;          // total cost
    private Integer durationDays; // number of days
    private String season;        // Summer, Winter, Monsoon
    private Boolean active = true; // is package active
    @ManyToMany
    @JoinTable(
            name = "package_landscapes",
            joinColumns = @JoinColumn(name = "package_id"),
            inverseJoinColumns = @JoinColumn(name = "landscape_id")
    )
    private Set<Landscape> landscapes; // included landscapes
    private Double rating=0.0;            // avg rating
    private Integer maxPeople;        // max group size
    private Integer minPeople;       // min group size
    private LocalDate availableFrom;  // start date
    private LocalDate availableTo;    // end date
    private String packageType;       // Family, Honeymoon, Solo, Group
    private String inclusions;        // Hotel, Food, Transport, Guide
    private String exclusions; //Safety Measures, Terms and Conditions
}
