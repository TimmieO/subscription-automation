package com.subscription.automation.service;

import com.subscription.automation.repository.UserRepository;
import com.subscription.automation.repository.ScriptRepository;
import com.subscription.automation.repository.ScriptExecutionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ScriptRepository scriptRepository;
    private final ScriptExecutionRepository scriptExecutionRepository;

    public DashboardService(
            UserRepository userRepository,
            ScriptRepository scriptRepository,
            ScriptExecutionRepository scriptExecutionRepository) {
        this.userRepository = userRepository;
        this.scriptRepository = scriptRepository;
        this.scriptExecutionRepository = scriptExecutionRepository;
    }

    @Transactional(readOnly = true)
    public DashboardMetrics getMetrics() {
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusHours(24);
        
        return new DashboardMetrics(
            userRepository.count(),
            scriptRepository.countByActive(true),
            scriptExecutionRepository.countByCreatedAtAfter(twentyFourHoursAgo),
            scriptExecutionRepository.sumTokensUsedSince(twentyFourHoursAgo)
        );
    }

    @Transactional(readOnly = true)
    public List<Object[]> getUserGrowth(LocalDateTime startDate, LocalDateTime endDate) {
        return userRepository.countByCreatedAtBetweenGroupByDate(startDate, endDate);
    }

    @Transactional(readOnly = true)
    public List<Object[]> getScriptExecutions(LocalDateTime startDate, LocalDateTime endDate) {
        return scriptExecutionRepository.countByCreatedAtBetweenGroupByDate(startDate, endDate);
    }

    @Transactional(readOnly = true)
    public List<Object[]> getTokenUsageByScriptType() {
        return scriptExecutionRepository.sumTokensUsedByScriptType();
    }

    public record DashboardMetrics(
        long totalUsers,
        long activeScripts,
        long scriptsLast24h,
        long tokensUsedToday
    ) {}
} 