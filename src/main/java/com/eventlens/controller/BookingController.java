package com.eventlens.controller;

import com.eventlens.dto.BookingRequest;
import com.eventlens.entity.Booking;
import com.eventlens.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;



@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:63342")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {

        if (request.getCustomerId() == null) {
            return ResponseEntity.status(401).body("Please login first!");
        }

        return ResponseEntity.ok(bookingService.createBooking(request));
    }

    // Get All
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // Get By ID
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id,
                                 @RequestBody BookingRequest request) {
        return bookingService.updateBooking(id, request);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteBooking(@PathVariable Long id) {

        bookingService.deleteBooking(id);

        return "Booking deleted successfully.";

    }

    @PutMapping("/{id}/confirm")
    public Booking confirmBooking(@PathVariable Long id) {
        return bookingService.confirmBooking(id);
    }

    @PutMapping("/{id}/reject")
    public Booking rejectBooking(@PathVariable Long id) {
        return bookingService.rejectBooking(id);
    }

    @PutMapping("/{id}/cancel")
    public Booking cancelBooking(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }

    @PutMapping("/{id}/complete")
    public Booking completeBooking(@PathVariable Long id) {
        return bookingService.completeBooking(id);
    }

    // Get bookings by customer
    @GetMapping("/customer/{customerId}")
    public List<Booking> getBookingsByCustomer(@PathVariable Long customerId) {

        return bookingService.getBookingsByCustomer(customerId);

    }

    // Get bookings by provider
    @GetMapping("/provider/{providerId}")
    public List<Booking> getBookingsByProvider(@PathVariable Long providerId) {

        return bookingService.getBookingsByProvider(providerId);

    }

    @GetMapping("/count")
    public long getBookingCount() {
        return bookingService.getBookingCount();
    }

}