package com.eventlens.service;

import com.eventlens.dto.BookingRequest;
import com.eventlens.entity.Booking;
import java.util.List;


public interface BookingService {

    Booking createBooking(BookingRequest request);

    List<Booking> getAllBookings();

    Booking getBookingById(Long id);

    Booking updateBooking(Long id, BookingRequest request);

    void deleteBooking(Long id);

    Booking confirmBooking(Long id);

    Booking rejectBooking(Long id);

    Booking cancelBooking(Long id);

    Booking completeBooking(Long id);

}