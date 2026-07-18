package com.eventlens.service.impl;

import com.eventlens.entity.Package;
import com.eventlens.repository.PackageRepository;
import com.eventlens.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {

    @Autowired
    private PackageRepository repo;

    @Override
    public Package createPackage(Package pkg) {
        return repo.save(pkg);
    }

    @Override
    public List<Package> getAllPackages() {
        return repo.findAll();
    }

    @Override
    public Package getById(Long id){
        return repo.findById(id).orElse(null);
    }

    @Override
    public Package save(Package p){
        return repo.save(p);
    }

    @Override
    public void delete(Long id){
        repo.deleteById(id);
    }
}