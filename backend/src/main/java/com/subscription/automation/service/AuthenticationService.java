package com.subscription.automation.service;

import com.subscription.automation.model.User;
import com.subscription.automation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSecurityService userSecurityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isActive()) {
            throw new RuntimeException("User account is deactivated");
        }

        if (userSecurityService.isAccountLocked(user)) {
            throw new RuntimeException("Account is locked due to too many failed login attempts");
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            userSecurityService.recordFailedLogin(user);
            throw new RuntimeException("Invalid password");
        }

        userSecurityService.recordSuccessfulLogin(user);
        user.setLastLogin(LocalDateTime.now());
        return userRepository.save(user);
    }
} 