package com.eventlens.service;
import com.eventlens.entity.BookingPackage;

import java.util.List;

public interface BookingPackageService {

    BookingPackage createPackage(BookingPackage pkg);

    List<BookingPackage> getAllPackages();

    BookingPackage getById(Long id);

    BookingPackage save(BookingPackage p);

    void delete(Long id);

}


