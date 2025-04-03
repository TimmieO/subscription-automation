package com.subscription.automation.service;

import com.subscription.automation.dto.UserCreateRequest;
import com.subscription.automation.dto.UserResponse;
import java.util.List;

public interface UserService {
    UserResponse createUser(UserCreateRequest request);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UserCreateRequest request);
    void deleteUser(Long id);
    void deactivateUser(Long id);
    void activateUser(Long id);
    void forceLogout(Long id);
    String generatePasswordResetToken(Long id);
} 