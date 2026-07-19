package com.eventlens.controller;
import com.eventlens.entity.BookingPackage;

import com.eventlens.service.BookingPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "http://localhost:63342")
public class BookingPackageController {

    @Autowired
    private BookingPackageService packageService;

    @PostMapping
    public BookingPackage createPackage(@RequestBody BookingPackage pkg) {
        return packageService.createPackage(pkg);
    }

    @GetMapping
    public List<BookingPackage> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public BookingPackage getById(@PathVariable Long id){
        return packageService.getById(id);
    }

    @PutMapping("/{id}")
    public BookingPackage update(@PathVariable Long id, @RequestBody BookingPackage p){

        BookingPackage existing = packageService.getById(id);

        if(existing != null){
            existing.setName(p.getName());
            existing.setDescription(p.getDescription());
            existing.setPrice(p.getPrice());
            existing.setHours(p.getHours());

            return packageService.save(existing);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        packageService.delete(id);
    }

    @GetMapping("/provider/{providerId}")
    public List<BookingPackage> getPackagesByProvider(@PathVariable Long providerId){

        return packageService.getPackagesByProvider(providerId);

    }
}
