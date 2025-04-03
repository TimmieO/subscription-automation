package com.subscription.automation.service;

public interface AuthService {
    void resetPassword(String token, String newPassword);
} 