package com.travel.Travel.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class TravelLog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tourist tourist; // the tourist who made the booking
    @ManyToOne
    private TravelPackage travelPackage; // the package booked
    private Double pricePaid; // amount paid
    private Integer numberOfPersons; // number of persons in the booking

    private LocalDate bookingDate; // date of booking
    private String status; // e.g., BOOKED, CANCELED
    private String bookingStatus; // CONFIRMED, CANCELLED
    private String paymentStatus; // PAID, PENDING
}
