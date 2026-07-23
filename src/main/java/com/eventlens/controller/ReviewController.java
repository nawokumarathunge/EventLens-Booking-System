package com.eventlens.controller;

import com.eventlens.dto.ReviewRequest;
import com.eventlens.entity.Review;
import com.eventlens.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:63342")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody ReviewRequest request) {
        return reviewService.saveReview(request);
    }

    @GetMapping("/provider/{providerId}")
    public List<Review> getProviderReviews(@PathVariable Long providerId) {
        return reviewService.getReviewsByProvider(providerId);
    }

    @GetMapping("/customer/{customerId}")
    public List<Review> getCustomerReviews(@PathVariable Long customerId) {
        return reviewService.getReviewsByCustomer(customerId);
    }
}