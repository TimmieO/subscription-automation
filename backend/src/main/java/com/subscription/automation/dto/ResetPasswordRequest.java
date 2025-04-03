package com.subscription.automation.dto;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String token;
    private String password;
} 