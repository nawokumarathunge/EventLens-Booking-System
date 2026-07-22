package com.eventlens.service;
import com.eventlens.entity.Notification;
import java.util.List;

public interface NotificationService {

    Notification create(Notification notification);

    List<Notification> getUserNotifications(Long userId);

    Notification markAsRead(Long id);

}