package com.subscription.automation.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private boolean active;
    private List<String> roles;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
} 