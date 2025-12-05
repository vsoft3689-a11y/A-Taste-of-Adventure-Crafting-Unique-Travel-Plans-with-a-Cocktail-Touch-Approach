package com.travel.Travel.repository;

import com.travel.Travel.entity.TravelLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelLogRepository extends JpaRepository<TravelLog, Long> {
List<TravelLog> findByTouristId(Long id);
}
