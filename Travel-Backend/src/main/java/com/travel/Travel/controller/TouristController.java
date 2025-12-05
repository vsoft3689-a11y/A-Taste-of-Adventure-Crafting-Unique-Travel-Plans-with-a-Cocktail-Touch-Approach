package com.travel.Travel.controller;

import com.travel.Travel.entity.Tourist;
import com.travel.Travel.entity.TravelLog;
import com.travel.Travel.entity.TravelPackage;
import com.travel.Travel.repository.TouristRepository;
import com.travel.Travel.repository.TravelLogRepository;
import com.travel.Travel.repository.TravelPackageRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tourist")
public class TouristController {

    private final TouristRepository touristRepo;
    private final TravelLogRepository travelLogRepo;
    private final TravelPackageRepository travelPackageRepo;

    public TouristController(TouristRepository touristRepo, TravelLogRepository travelLogRepo,
                             TravelPackageRepository travelPackageRepo) {
        this.touristRepo = touristRepo;
        this.travelLogRepo = travelLogRepo;
        this.travelPackageRepo = travelPackageRepo;
    }

    // GET TOURIST PROFILE
    @GetMapping("/{id}/profile")
    public Tourist getProfile(@PathVariable Long id) {
        return touristRepo.findById(id).orElseThrow();
    }

    // UPDATE TOURIST PROFILE
    @PutMapping("/{id}/profile")
    public Tourist updateProfile(@PathVariable Long id, @RequestBody Tourist updatedTourist) {

        Tourist existingTourist = touristRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tourist not found"));

        // Basic Details
        existingTourist.setPreferredPriceMin(updatedTourist.getPreferredPriceMin());
        existingTourist.setPreferredPriceMax(updatedTourist.getPreferredPriceMax());
        existingTourist.setPreferredSeason(updatedTourist.getPreferredSeason());
        existingTourist.setAddress(updatedTourist.getAddress());
        existingTourist.setContact(updatedTourist.getContact());

        // *** NEW FIELDS ***
        existingTourist.setAge(updatedTourist.getAge());
        existingTourist.setGender(updatedTourist.getGender());
        existingTourist.setTravelFrequency(updatedTourist.getTravelFrequency());
        existingTourist.setBudgetRange(updatedTourist.getBudgetRange());
        existingTourist.setTravelStyle(updatedTourist.getTravelStyle());
        existingTourist.setFoodPreference(updatedTourist.getFoodPreference());
        existingTourist.setPrefersCrowdedPlaces(updatedTourist.getPrefersCrowdedPlaces());

        // For interests (Set<String>)
        existingTourist.setInterests(updatedTourist.getInterests());

        return touristRepo.save(existingTourist);
    }

    // GET TRAVEL HISTORY
    @GetMapping("/{id}/history")
    public List<TravelLog> getHistory(@PathVariable Long id) {
        return travelLogRepo.findByTouristId(id);
    }

    // BOOK A PACKAGE
    @PostMapping("/{touristId}/book/{packageId}")
    public TravelLog bookPackage(
            @PathVariable Long touristId,
            @PathVariable Long packageId,
            @RequestBody Map<String, Object> body
    ) {

        Integer persons = Integer.parseInt(body.get("numberOfPersons").toString());
        Double amount = Double.valueOf(body.get("pricePaid").toString());

        Tourist t = touristRepo.findById(touristId)
                .orElseThrow(() -> new RuntimeException("Tourist not found"));

        TravelPackage pkg = travelPackageRepo.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        TravelLog log = new TravelLog();
        log.setTourist(t);
        log.setTravelPackage(pkg);
        log.setPricePaid(amount);
        log.setNumberOfPersons(persons);

        // Auto-fill new fields
        log.setBookingDate(LocalDate.now());
        log.setStatus("BOOKED");
        log.setBookingStatus("CONFIRMED");
        log.setPaymentStatus("PAID");

        return travelLogRepo.save(log);
    }
}
