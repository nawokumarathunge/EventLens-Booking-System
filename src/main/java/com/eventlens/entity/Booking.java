package com.eventlens.entity;

import com.eventlens.enums.BookingStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Customer
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    // Photographer / Videographer
    @ManyToOne
    @JoinColumn(name = "service_provider_id")
    private User serviceProvider;

    // Selected Package
    @ManyToOne
    @JoinColumn(name = "package_id")
    private BookingPackage bookingPackage;

    private String eventType;

    private LocalDate eventDate;

    private LocalTime eventTime;

    private String location;

    private String specialRequest;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    public Booking() {
    }

    // ================== Getters & Setters ==================

    public Long getId() {
        return id;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public User getServiceProvider() {
        return serviceProvider;
    }

    public void setServiceProvider(User serviceProvider) {
        this.serviceProvider = serviceProvider;
    }

    public BookingPackage getBookingPackage() {
        return bookingPackage;
    }

    public void setBookingPackage(BookingPackage bookingPackage) {
        this.bookingPackage = bookingPackage;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public LocalDate getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDate eventDate) {
        this.eventDate = eventDate;
    }

    public LocalTime getEventTime() {
        return eventTime;
    }

    public void setEventTime(LocalTime eventTime) {
        this.eventTime = eventTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSpecialRequest() {
        return specialRequest;
    }

    public void setSpecialRequest(String specialRequest) {
        this.specialRequest = specialRequest;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}