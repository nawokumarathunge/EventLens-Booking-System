package com.eventlens.repository;
import com.eventlens.entity.BookingPackage;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingPackageRepository extends JpaRepository<BookingPackage, Long> {

    List<BookingPackage> findByServiceProviderId(Long providerId);

}
