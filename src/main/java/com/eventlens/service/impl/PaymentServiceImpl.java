package com.eventlens.service.impl;

import com.eventlens.dto.PaymentRequest;
import com.eventlens.entity.Booking;
import com.eventlens.entity.Payment;
import com.eventlens.enums.BookingStatus;
import com.eventlens.enums.PaymentStatus;
import com.eventlens.repository.BookingRepository;
import com.eventlens.repository.PaymentRepository;
import com.eventlens.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Payment createPayment(PaymentRequest request) {

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Payment payment = new Payment();

        payment.setBooking(booking);
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setPaymentDate(LocalDateTime.now());

        booking.setStatus(BookingStatus.COMPLETED);

        bookingRepository.save(booking);

        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {

        return paymentRepository.findAll();

    }

    @Override
    public Payment getPayment(Long id) {

        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

    }

    @Override
    public Payment getPaymentByBooking(Long bookingId) {

        return paymentRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

    }

    @Override
    public List<Payment> getPaymentsByCustomer(Long customerId) {

        return paymentRepository.findByCustomerId(customerId);

    }

    @Override
    public Payment completePayment(Long id, PaymentRequest request) {

        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setPaymentMethod(request.getPaymentMethod());

        payment.setStatus(PaymentStatus.SUCCESS);

        payment.setPaymentDate(LocalDateTime.now());

        Booking booking = payment.getBooking();

        booking.setStatus(BookingStatus.COMPLETED);

        bookingRepository.save(booking);

        return paymentRepository.save(payment);

    }

}