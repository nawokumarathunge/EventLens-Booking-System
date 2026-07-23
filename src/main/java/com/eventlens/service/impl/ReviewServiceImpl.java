package com.eventlens.service.impl;

import com.eventlens.dto.ReviewRequest;
import com.eventlens.entity.Booking;
import com.eventlens.entity.Review;
import com.eventlens.repository.BookingRepository;
import com.eventlens.repository.NotificationRepository;
import com.eventlens.repository.ReviewRepository;
import com.eventlens.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.eventlens.entity.Notification;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Review saveReview(ReviewRequest request) {

        Booking booking = bookingRepository.findById(request.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (reviewRepository.existsByBookingId(request.getBookingId())) {
            throw new RuntimeException("Review already submitted for this booking.");
        }

        Review review = new Review();

        review.setBooking(booking);

        review.setCustomer(booking.getCustomer());
        review.setServiceProvider(booking.getServiceProvider());

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        Notification notification = new Notification();

        notification.setUser(booking.getServiceProvider());

        notification.setTitle("⭐ New Review");

        notification.setMessage(
                booking.getCustomer().getName()
                        + " rated you "
                        + review.getRating()
                        + "★"
        );

        notification.setIsRead(false);

        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);

        return savedReview;
    }

    @Override
    public List<Review> getReviewsByProvider(Long providerId) {

        return reviewRepository.findByServiceProviderId(providerId);

    }

    @Override
    public List<Review> getReviewsByCustomer(Long customerId) {

        return reviewRepository.findByCustomerId(customerId);

    }

}