package com.travel.Travel.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Review {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Tourist tourist;

    @ManyToOne
    private TravelPackage travelPackage;

    private Integer rating; // 1-5
    private String comment;
    private LocalDate date;
}
