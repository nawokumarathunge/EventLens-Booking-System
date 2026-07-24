package com.eventlens.service;

import com.eventlens.dto.ReportSummaryDTO;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


public interface ReportService {

    ReportSummaryDTO getSummaryReport();

    void generateBookingReport(HttpServletResponse response) throws IOException;

    void generateRevenueReport(HttpServletResponse response) throws IOException;

    void generateCustomerReport(HttpServletResponse response) throws IOException;


}