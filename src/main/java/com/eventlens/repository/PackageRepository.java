package com.eventlens.repository;
import com.eventlens.entity.Package;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PackageRepository extends JpaRepository<Package, Long> {
}
