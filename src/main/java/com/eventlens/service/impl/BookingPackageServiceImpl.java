package com.eventlens.service.impl;

import com.eventlens.entity.BookingPackage;
import com.eventlens.repository.BookingPackageRepository;
import com.eventlens.service.BookingPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingPackageServiceImpl implements BookingPackageService {

    @Autowired
    private BookingPackageRepository repo;

    @Override
    public BookingPackage createPackage(BookingPackage pkg) {
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
}