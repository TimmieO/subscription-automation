package com.subscription.automation.service;

import com.subscription.automation.dto.LoginRequest;
import com.subscription.automation.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
    void resetPassword(String token, String newPassword);
    LoginResponse refreshToken(String refreshToken);
} 