package com.subscription.automation.service.impl;

import com.subscription.automation.model.User;
import com.subscription.automation.model.UserActivity;
import com.subscription.automation.repository.UserActivityRepository;
import com.subscription.automation.repository.UserRepository;
import com.subscription.automation.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class UserActivityServiceImpl implements UserActivityService {

    private final UserActivityRepository userActivityRepository;
    private final UserRepository userRepository;

    @Autowired
    public UserActivityServiceImpl(UserActivityRepository userActivityRepository, UserRepository userRepository) {
        this.userActivityRepository = userActivityRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void logActivity(Long userId, String action, String details, String ipAddress, String status, String errorMessage) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserActivity activity = new UserActivity();
        activity.setUser(user);
        activity.setAction(action);
        activity.setDetails(details);
        activity.setIpAddress(ipAddress);
        activity.setStatus(status);
        activity.setErrorMessage(errorMessage);

        userActivityRepository.save(activity);
    }

    @Override
    public Page<UserActivity> getUserActivities(Long userId, Pageable pageable) {
        return userActivityRepository.findByUserId(userId, pageable);
    }

    @Override
    public Page<UserActivity> getUserActivitiesByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return userActivityRepository.findByUserIdAndTimestampBetween(userId, startDate, endDate, pageable);
    }

    @Override
    public Page<UserActivity> getAllActivitiesByDateRange(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return userActivityRepository.findByTimestampBetween(startDate, endDate, pageable);
    }
} 