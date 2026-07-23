package com.eventlens.service;

import com.eventlens.dto.PaymentRequest;
import com.eventlens.entity.Payment;

import java.util.List;

public interface PaymentService {

    Payment createPayment(PaymentRequest request);

    List<Payment> getAllPayments();

    Payment getPayment(Long id);

    Payment getPaymentByBooking(Long bookingId);

    List<Payment> getPaymentsByCustomer(Long customerId);

    Payment completePayment(Long id, PaymentRequest request);

    Double getRevenue();

}