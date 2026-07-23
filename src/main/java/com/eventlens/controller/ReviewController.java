package com.eventlens.controller;

import com.eventlens.dto.ReviewRequest;
import com.eventlens.entity.Review;
import com.eventlens.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


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

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/count")
    public long getReviewCount() {
        return reviewService.getReviewCount();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Review deleted successfully");
    }
}