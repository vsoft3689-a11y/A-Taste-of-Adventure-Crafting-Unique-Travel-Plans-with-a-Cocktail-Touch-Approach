package com.travel.Travel.controller;

import com.travel.Travel.dto.AdminPackageRequest;
import com.travel.Travel.entity.Landscape;
import com.travel.Travel.entity.TravelLog;
import com.travel.Travel.entity.TravelPackage;
import com.travel.Travel.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final TravelPackageRepository packageRepo;
    private final LandscapeRepository landscapeRepo;
    private final TravelLogRepository travelLogRepo;


    public AdminController(TravelPackageRepository packageRepo,
                           LandscapeRepository landscapeRepo,
                           TravelLogRepository travelLogRepo) {
        this.packageRepo = packageRepo;
        this.landscapeRepo = landscapeRepo;
        this.travelLogRepo = travelLogRepo;
    }

    // CREATE PACKAGE
    @PostMapping("/package")
    public TravelPackage createPackage(@RequestBody AdminPackageRequest req) {

        TravelPackage pkg = new TravelPackage();

        pkg.setTitle(req.getTitle());
        pkg.setDescription(req.getDescription());
        pkg.setPrice(req.getPrice());
        pkg.setDurationDays(req.getDurationDays());
        pkg.setSeason(req.getSeason());
        pkg.setActive(req.getActive());

        // NEW FIELDS
        pkg.setRating(req.getRating());
        pkg.setMaxPeople(req.getMaxPeople());
        pkg.setMinPeople(req.getMinPeople());
        pkg.setAvailableFrom(req.getAvailableFrom());
        pkg.setAvailableTo(req.getAvailableTo());
        pkg.setPackageType(req.getPackageType());
        pkg.setInclusions(req.getInclusions());
        pkg.setExclusions(req.getExclusions());

        // Landscapes
        Set<Landscape> landscapeSet =
                new HashSet<>(landscapeRepo.findAllById(req.getLandscapeIds()));
        pkg.setLandscapes(landscapeSet);

        return packageRepo.save(pkg);
    }

    // UPDATE PACKAGE
    @PutMapping("/package/{id}")
    public TravelPackage updatePackage(
            @PathVariable Long id,
            @RequestBody TravelPackage pkg
    ) {
        TravelPackage existing = packageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        existing.setTitle(pkg.getTitle());
        existing.setDescription(pkg.getDescription());
        existing.setPrice(pkg.getPrice());
        existing.setDurationDays(pkg.getDurationDays());
        existing.setActive(pkg.getActive());
        existing.setSeason(pkg.getSeason());

        // Convert landscape IDs into Landscape objects
        if (pkg.getLandscapes() != null) {
            List<Long> ids = pkg.getLandscapes().stream()
                    .map(l -> l.getId())
                    .toList();

            List<Landscape> landscapeList = landscapeRepo.findAllById(ids);
            existing.setLandscapes((Set<Landscape>) landscapeList);
        }

        existing.setMaxPeople(pkg.getMaxPeople());
        existing.setMinPeople(pkg.getMinPeople());
        existing.setAvailableFrom(pkg.getAvailableFrom());
        existing.setAvailableTo(pkg.getAvailableTo());
        existing.setPackageType(pkg.getPackageType());
        existing.setInclusions(pkg.getInclusions());
        existing.setExclusions(pkg.getExclusions());
        return packageRepo.save(existing);
    }

    // DELETE PACKAGE
    @DeleteMapping("/package/{id}")
    public void deletePackage(@PathVariable Long id) {
        packageRepo.deleteById(id);
    }

    // GET ALL LANDSCAPES
    @GetMapping("/landscapes")
    public List<Landscape> getAll() {
        return landscapeRepo.findAll();
    }

    // ADD LANDSCAPE
    @PostMapping("/landscape")
    public Landscape add(@RequestBody Landscape l) {
        return landscapeRepo.save(l);
    }

    // UPDATE LANDSCAPE
    @PutMapping("/landscape/{id}")
    public Landscape updateLandscape(
            @PathVariable Long id,
            @RequestBody Landscape l
    ) {
        Landscape existing = landscapeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Landscape not found"));

        existing.setName(l.getName());
        existing.setCity(l.getCity());
        existing.setDescription(l.getDescription());
        existing.setImageUrl(l.getImageUrl());
        existing.setSeason(l.getSeason());
        existing.setCategory(l.getCategory());
        existing.setRating(l.getRating());
        existing.setPopularity(l.getPopularity());
        existing.setLatitude(l.getLatitude());
        existing.setLongitude(l.getLongitude());
        existing.setAverageCost(l.getAverageCost());
        existing.setBestTimeToVisit(l.getBestTimeToVisit());
        existing.setPrecautions(l.getPrecautions());
        existing.setContactInfo(l.getContactInfo());
        existing.setTimings(l.getTimings());
        existing.setPreferredAgeGroup(l.getPreferredAgeGroup());
        existing.setPreferredGender(l.getPreferredGender());
        existing.setIsCrowdedPlace(l.getIsCrowdedPlace());

        return landscapeRepo.save(existing);
    }


    // DELETE LANDSCAPE
    @DeleteMapping("/landscape/{id}")
    public void delete(@PathVariable Long id) {
        landscapeRepo.deleteById(id);
    }

    // MANAGE BOOKINGS
    @GetMapping("/bookings")
    public List<TravelLog> manageBookings() {
        return travelLogRepo.findAll();
    }
}
