package com.eventlens.repository;

import com.eventlens.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByServiceProviderId(Long providerId);

    List<Review> findByCustomerId(Long customerId);

    boolean existsByBookingId(Long bookingId);

}