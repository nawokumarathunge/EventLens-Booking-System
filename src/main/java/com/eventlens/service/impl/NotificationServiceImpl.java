package com.eventlens.service.impl;

import com.eventlens.entity.Notification;
import com.eventlens.repository.NotificationRepository;
import com.eventlens.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification create(Notification notification) {

        return notificationRepository.save(notification);

    }

    @Override
    public List<Notification> getUserNotifications(Long userId) {

        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);

    }

    @Override
    public Notification markAsRead(Long id) {

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setIsRead(true);

        return notificationRepository.save(notification);

    }

}