package com.eventlens.controller;

import com.eventlens.dto.ReportSummaryDTO;
import com.eventlens.service.ReportService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:63342")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/summary")
    public ReportSummaryDTO getSummaryReport() {

        return reportService.getSummaryReport();

    }
    @GetMapping("/bookings")
    public void bookingReport(HttpServletResponse response)
            throws IOException {

        response.setHeader(
                "Content-Disposition",
                "attachment; filename=Booking_Report.pdf"
        );


        reportService.generateBookingReport(response);

    }

    @GetMapping("/revenue")
    public void revenueReport(HttpServletResponse response) throws IOException {
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=Booking_Report.pdf"
        );

        reportService.generateRevenueReport(response);

    }

    @GetMapping("/customers")
    public void customerReport(HttpServletResponse response) throws IOException {
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=Booking_Report.pdf"
        );

        reportService.generateCustomerReport(response);

    }

    @GetMapping("/bookings/view")
    public void viewBookingReport(HttpServletResponse response)
            throws IOException {

        response.setHeader(
                "Content-Disposition",
                "inline; filename=Booking_Report.pdf"
        );

        reportService.generateBookingReport(response);
    }

    @GetMapping("/revenue/view")
    public void viewRevenueReport(HttpServletResponse response)
            throws IOException {

        response.setHeader(
                "Content-Disposition",
                "inline; filename=Revenue_Report.pdf"
        );

        reportService.generateRevenueReport(response);
    }

    @GetMapping("/customers/view")
    public void viewCustomerReport(HttpServletResponse response)
            throws IOException {

        response.setHeader(
                "Content-Disposition",
                "inline; filename=Customer_Report.pdf"
        );

        reportService.generateCustomerReport(response);
    }
}