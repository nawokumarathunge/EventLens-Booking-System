package com.eventlens.controller;
import com.eventlens.entity.Notification;
import com.eventlens.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins="http://localhost:63342")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/user/{id}")
    public List<Notification> getNotifications(@PathVariable Long id){

        return notificationService.getUserNotifications(id);

    }

    @PutMapping("/{id}/read")
    public Notification read(@PathVariable Long id){

        return notificationService.markAsRead(id);

    }

    @GetMapping("/recent")
    public List<Notification> getRecentActivities() {

        return notificationService.getRecentActivities();

    }

}