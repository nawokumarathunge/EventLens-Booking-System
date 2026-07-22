package com.eventlens.repository;

import com.eventlens.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment,Long> {

    List<Payment> findByCustomerId(Long customerId);

    Optional<Payment> findByBookingId(Long bookingId);


}