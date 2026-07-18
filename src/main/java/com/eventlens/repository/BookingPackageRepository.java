package com.eventlens.repository;
import com.eventlens.entity.BookingPackage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingPackageRepository extends JpaRepository<BookingPackage, Long> {
}
