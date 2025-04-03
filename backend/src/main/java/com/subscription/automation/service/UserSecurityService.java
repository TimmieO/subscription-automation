package com.subscription.automation.service;

import com.subscription.automation.model.User;
import com.subscription.automation.model.UserSecurity;
import com.subscription.automation.repository.UserSecurityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class UserSecurityService {

    @Autowired
    private UserSecurityRepository userSecurityRepository;

    @Transactional
    public UserSecurity getOrCreateUserSecurity(User user) {
        return userSecurityRepository.findByUser_Id(user.getId())
            .orElseGet(() -> {
                UserSecurity userSecurity = new UserSecurity();
                userSecurity.setUser(user);
                return userSecurityRepository.save(userSecurity);
            });
    }

    @Transactional
    public void recordSuccessfulLogin(User user) {
        UserSecurity userSecurity = getOrCreateUserSecurity(user);
        userSecurity.setFailedLoginAttempts(0);
        userSecurity.setLastSuccessfulLogin(LocalDateTime.now());
        userSecurity.setAccountLockedUntil(null);
        userSecurityRepository.save(userSecurity);
    }

    @Transactional
    public void recordFailedLogin(User user) {
        UserSecurity userSecurity = getOrCreateUserSecurity(user);
        userSecurity.setFailedLoginAttempts(userSecurity.getFailedLoginAttempts() + 1);
        userSecurity.setLastFailedLogin(LocalDateTime.now());

        if (userSecurity.getFailedLoginAttempts() >= 5) {
            userSecurity.setAccountLockedUntil(LocalDateTime.now().plusMinutes(30));
        }

        userSecurityRepository.save(userSecurity);
    }

    @Transactional
    public boolean isAccountLocked(User user) {
        UserSecurity userSecurity = getOrCreateUserSecurity(user);
        if (userSecurity.getAccountLockedUntil() == null) {
            return false;
        }
        return LocalDateTime.now().isBefore(userSecurity.getAccountLockedUntil());
    }

    @Transactional
    public void recordRequest(User user) {
        UserSecurity userSecurity = getOrCreateUserSecurity(user);
        LocalDateTime now = LocalDateTime.now();

        // Reset request count if it's been more than 1 hour since last reset
        if (userSecurity.getLastRequestReset() == null || 
            ChronoUnit.HOURS.between(userSecurity.getLastRequestReset(), now) >= 1) {
            userSecurity.setRequestCount(0);
            userSecurity.setLastRequestReset(now);
        }

        userSecurity.setRequestCount(userSecurity.getRequestCount() + 1);
        userSecurity.setLastRequestTime(now);
        userSecurityRepository.save(userSecurity);
    }

    @Transactional
    public boolean isRateLimited(User user) {
        UserSecurity userSecurity = getOrCreateUserSecurity(user);
        LocalDateTime now = LocalDateTime.now();

        // Reset request count if it's been more than 1 hour since last reset
        if (userSecurity.getLastRequestReset() == null || 
            ChronoUnit.HOURS.between(userSecurity.getLastRequestReset(), now) >= 1) {
            userSecurity.setRequestCount(0);
            userSecurity.setLastRequestReset(now);
            userSecurityRepository.save(userSecurity);
            return false;
        }

        return userSecurity.getRequestCount() >= 100; // Limit to 100 requests per hour
    }
} 