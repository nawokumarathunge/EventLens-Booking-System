package com.eventlens.service;

import com.eventlens.dto.ReviewRequest;
import com.eventlens.entity.Review;

import java.util.List;

public interface ReviewService {

    Review saveReview(ReviewRequest request);

    List<Review> getReviewsByProvider(Long providerId);

    List<Review> getReviewsByCustomer(Long customerId);

    long getReviewCount();

    List<Review> getAllReviews();

    void deleteReview(Long id);

}