package com.eventlens.repository;

import com.eventlens.entity.Booking;
import com.eventlens.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);

    List<Booking> findByServiceProviderId(Long providerId);

    long count();

    boolean existsByBookingPackageId(Long packageId);

    long countByStatus(BookingStatus status);




}