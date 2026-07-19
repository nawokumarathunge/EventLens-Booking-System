package com.eventlens.service.impl;

import com.eventlens.entity.BookingPackage;
import com.eventlens.repository.BookingPackageRepository;
import com.eventlens.service.BookingPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.eventlens.entity.User;
import com.eventlens.repository.UserRepository;

import java.util.List;

@Service
public class BookingPackageServiceImpl implements BookingPackageService {

    @Autowired
    private BookingPackageRepository repo;

    @Autowired
    private UserRepository userRepository;

    @Override
    public BookingPackage createPackage(BookingPackage pkg) {

        User provider = userRepository.findById(
                pkg.getServiceProvider().getId()
        ).orElseThrow(() -> new RuntimeException("Provider not found"));

        pkg.setServiceProvider(provider);

        return repo.save(pkg);
    }

    @Override
    public List<BookingPackage> getAllPackages() {
        return repo.findAll();
    }

    @Override
    public BookingPackage getById(Long id){
        return repo.findById(id).orElse(null);
    }

    @Override
    public BookingPackage save(BookingPackage p){
        return repo.save(p);
    }

    @Override
    public void delete(Long id){
        repo.deleteById(id);
    }

    @Override
    public List<BookingPackage> getPackagesByProvider(Long providerId) {

        return repo.findByServiceProviderId(providerId);

    }
}