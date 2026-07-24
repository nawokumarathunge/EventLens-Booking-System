package com.eventlens.repository;

import com.eventlens.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import com.eventlens.enums.PaymentStatus;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment,Long> {

    List<Payment> findByCustomerId(Long customerId);

    Optional<Payment> findByBookingId(Long bookingId);

    long countByStatus(PaymentStatus status);

    @Query("SELECT COALESCE(SUM(p.amount),0) FROM Payment p WHERE p.status='SUCCESS'")
    Double getTotalRevenue();

}