package com.eventlens.service;
import com.eventlens.entity.Package;

import java.util.List;

public interface PackageService {

    Package createPackage(Package pkg);

    List<Package> getAllPackages();

    Package getById(Long id);

    Package save(Package p);

    void delete(Long id);

}


