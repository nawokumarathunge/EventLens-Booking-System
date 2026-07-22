package com.eventlens.service.impl;

import com.eventlens.entity.*;
import com.eventlens.service.BookingService;
import com.eventlens.dto.BookingRequest;
import com.eventlens.enums.BookingStatus;
import com.eventlens.repository.BookingPackageRepository;
import com.eventlens.repository.BookingRepository;
import com.eventlens.repository.PaymentRepository;
import com.eventlens.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.eventlens.enums.PaymentStatus;
import com.eventlens.repository.NotificationRepository;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingPackageRepository bookingPackageRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Booking createBooking(BookingRequest request) {

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        User provider = userRepository.findById(request.getServiceProviderId())
                .orElseThrow(() -> new RuntimeException("Service Provider not found"));

        BookingPackage bookingPackage = bookingPackageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found"));

        Booking booking = new Booking();

        booking.setCustomer(customer);
        booking.setServiceProvider(provider);
        booking.setBookingPackage(bookingPackage);

        booking.setEventType(request.getEventType());
        booking.setEventDate(request.getEventDate());
        booking.setEventTime(request.getEventTime());
        booking.setLocation(request.getLocation());
        booking.setSpecialRequest(request.getSpecialRequest());

        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {

        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

    }

    @Override
    public Booking updateBooking(Long id, BookingRequest request) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        User provider = userRepository.findById(request.getServiceProviderId())
                .orElseThrow(() -> new RuntimeException("Service Provider not found"));

        BookingPackage bookingPackage = bookingPackageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found"));

        booking.setCustomer(customer);
        booking.setServiceProvider(provider);
        booking.setBookingPackage(bookingPackage);

        booking.setEventType(request.getEventType());
        booking.setEventDate(request.getEventDate());
        booking.setEventTime(request.getEventTime());
        booking.setLocation(request.getLocation());
        booking.setSpecialRequest(request.getSpecialRequest());

        return bookingRepository.save(booking);
    }
    @Override
    public void deleteBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        bookingRepository.delete(booking);

    }

    @Override
    public Booking rejectBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.REJECTED);

        return bookingRepository.save(booking);


    }

    @Override
    public Booking cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);

        return bookingRepository.save(booking);
    }

    @Override
    public Booking completeBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.COMPLETED);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingsByCustomer(Long customerId) {

        return bookingRepository.findByCustomerId(customerId);

    }

    @Override
    public List<Booking> getBookingsByProvider(Long providerId) {

        return bookingRepository.findByServiceProviderId(providerId);

    }

    @Override
    public Booking confirmBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CONFIRMED);

        bookingRepository.save(booking);

        System.out.println("Booking confirmed");

        if (paymentRepository.findByBookingId(booking.getId()).isEmpty()) {

            Payment payment = new Payment();

            payment.setBooking(booking);
            payment.setCustomer(booking.getCustomer());
            payment.setAmount(booking.getBookingPackage().getPrice());
            payment.setStatus(PaymentStatus.PENDING);

            paymentRepository.save(payment);

            System.out.println("Payment created");
        }

        Notification notification = new Notification();

        notification.setUser(booking.getCustomer());
        notification.setTitle("Booking Confirmed");
        notification.setMessage(
                "Your booking with "
                        + booking.getServiceProvider().getName()
                        + " has been confirmed."
        );
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

        System.out.println("Notification saved");

        return booking;
    }


}