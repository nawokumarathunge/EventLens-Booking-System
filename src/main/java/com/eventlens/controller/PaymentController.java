package com.eventlens.controller;

import com.eventlens.dto.PaymentRequest;
import com.eventlens.entity.Payment;
import com.eventlens.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:63342")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment createPayment(@RequestBody PaymentRequest request){

        return paymentService.createPayment(request);

    }

    @GetMapping
    public List<Payment> getAllPayments(){

        return paymentService.getAllPayments();

    }

    @GetMapping("/{id}")
    public Payment getPayment(@PathVariable Long id){

        return paymentService.getPayment(id);

    }

    @GetMapping("/booking/{bookingId}")
    public Payment getPaymentByBooking(@PathVariable Long bookingId){

        return paymentService.getPaymentByBooking(bookingId);

    }

    @GetMapping("/customer/{customerId}")
    public List<Payment> getPaymentsByCustomer(@PathVariable Long customerId){

        return paymentService.getPaymentsByCustomer(customerId);

    }

    @PutMapping("/{id}/pay")
    public Payment completePayment(
            @PathVariable Long id,
            @RequestBody PaymentRequest request){

        return paymentService.completePayment(id, request);

    }

}