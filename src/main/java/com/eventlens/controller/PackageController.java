package com.eventlens.controller;
import com.eventlens.entity.Package;

import com.eventlens.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageService packageService;

    @PostMapping
    public Package createPackage(@RequestBody Package pkg) {
        return packageService.createPackage(pkg);
    }

    @GetMapping
    public List<Package> getAllPackages() {
        return packageService.getAllPackages();
    }

    @GetMapping("/{id}")
    public Package getById(@PathVariable Long id){
        return packageService.getById(id);
    }

    @PutMapping("/{id}")
    public Package update(@PathVariable Long id, @RequestBody Package p){

        Package existing = packageService.getById(id);

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
}
