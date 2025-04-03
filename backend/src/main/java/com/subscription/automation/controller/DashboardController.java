package com.subscription.automation.controller;

import com.subscription.automation.service.DashboardService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/metrics")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<DashboardService.DashboardMetrics> getMetrics() {
        return ResponseEntity.ok(dashboardService.getMetrics());
    }

    @GetMapping("/charts")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getCharts(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate
    ) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime thirtyDaysAgo = now.minusDays(30);

        // Use provided dates or default to last 30 days
        LocalDateTime start = startDate != null ? startDate : thirtyDaysAgo;
        LocalDateTime end = endDate != null ? endDate : now;

        // User growth data
        List<Object[]> userGrowth = dashboardService.getUserGrowth(start, end);
        List<String> userGrowthLabels = userGrowth.stream()
            .map(data -> ((LocalDateTime) data[0]).toLocalDate().toString())
            .toList();
        List<Long> userGrowthData = userGrowth.stream()
            .map(data -> (Long) data[1])
            .toList();

        // Script executions data
        List<Object[]> scriptExecutions = dashboardService.getScriptExecutions(start, end);
        List<String> scriptExecutionLabels = scriptExecutions.stream()
            .map(data -> ((LocalDateTime) data[0]).toLocalDate().toString())
            .toList();
        List<Long> scriptExecutionData = scriptExecutions.stream()
            .map(data -> (Long) data[1])
            .toList();

        // Token usage by script type
        List<Object[]> tokenUsage = dashboardService.getTokenUsageByScriptType();
        List<String> tokenUsageLabels = tokenUsage.stream()
            .map(data -> (String) data[0])
            .toList();
        List<Long> tokenUsageData = tokenUsage.stream()
            .map(data -> (Long) data[1])
            .toList();

        return ResponseEntity.ok(Map.of(
            "userGrowth", Map.of(
                "labels", userGrowthLabels,
                "data", userGrowthData
            ),
            "scriptExecutions", Map.of(
                "labels", scriptExecutionLabels,
                "data", scriptExecutionData
            ),
            "tokenUsage", Map.of(
                "labels", tokenUsageLabels,
                "data", tokenUsageData
            )
        ));
    }
} 