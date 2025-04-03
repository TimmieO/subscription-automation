package com.subscription.automation.controller;

import com.subscription.automation.model.UserActivity;
import com.subscription.automation.service.UserActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users/{userId}/activities")
public class UserActivityController {

    @Autowired
    private UserActivityService userActivityService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<UserActivity>> getUserActivities(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        PageRequest pageable = PageRequest.of(page, size);
        
        if (startDate != null && endDate != null) {
            return ResponseEntity.ok(userActivityService.getUserActivitiesByDateRange(userId, startDate, endDate, pageable));
        }
        
        return ResponseEntity.ok(userActivityService.getUserActivities(userId, pageable));
    }
} 