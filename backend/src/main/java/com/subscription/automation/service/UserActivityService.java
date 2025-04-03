package com.subscription.automation.service;

import com.subscription.automation.model.UserActivity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;

public interface UserActivityService {
    void logActivity(Long userId, String action, String details, String ipAddress, String status, String errorMessage);
    Page<UserActivity> getUserActivities(Long userId, Pageable pageable);
    Page<UserActivity> getUserActivitiesByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    Page<UserActivity> getAllActivitiesByDateRange(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
} 