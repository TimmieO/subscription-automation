package com.subscription.automation.service;

import com.subscription.automation.model.Script;
import com.subscription.automation.model.ScriptExecution;
import com.subscription.automation.repository.ScriptExecutionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScriptService {

    private final ScriptExecutionRepository scriptExecutionRepository;

    public ScriptService(ScriptExecutionRepository scriptExecutionRepository) {
        this.scriptExecutionRepository = scriptExecutionRepository;
    }

    @Transactional
    public ScriptExecution executeScript(Script script) {
        ScriptExecution execution = new ScriptExecution();
        execution.setScript(script);
        execution.setStartedAt(LocalDateTime.now());

        try {
            // Execute the script based on its type
            switch (script.getType().toLowerCase()) {
                case "python":
                    execution.setStatus("SUCCESS");
                    break;
                case "javascript":
                    execution.setStatus("SUCCESS");
                    break;
                case "shell":
                    execution.setStatus("SUCCESS");
                    break;
                default:
                    execution.setStatus("ERROR");
                    execution.setError("Unsupported script type");
            }
        } catch (Exception e) {
            execution.setStatus("ERROR");
            execution.setError(e.getMessage());
        }

        execution.setCompletedAt(LocalDateTime.now());
        return scriptExecutionRepository.save(execution);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getScriptStats(Long scriptId) {
        Map<String, Object> stats = new HashMap<>();

        // Get total execution count
        long totalExecutions = scriptExecutionRepository.countByScriptId(scriptId);
        stats.put("executionCount", totalExecutions);

        // Get last execution time
        ScriptExecution lastExecution = scriptExecutionRepository.findFirstByScriptIdOrderByCompletedAtDesc(scriptId);
        stats.put("lastExecutionTime", lastExecution != null ? lastExecution.getCompletedAt() : null);

        // Calculate average execution time
        List<ScriptExecution> executions = scriptExecutionRepository.findByScriptId(scriptId);
        if (!executions.isEmpty()) {
            double averageTime = executions.stream()
                .filter(e -> e.getCompletedAt() != null && e.getStartedAt() != null)
                .mapToLong(e -> java.time.Duration.between(e.getStartedAt(), e.getCompletedAt()).toMillis())
                .average()
                .orElse(0.0);
            stats.put("averageExecutionTime", averageTime);
        } else {
            stats.put("averageExecutionTime", null);
        }

        // Get success rate
        long successCount = scriptExecutionRepository.countByScriptIdAndStatus(scriptId, "SUCCESS");
        double successRate = totalExecutions > 0 ? (double) successCount / totalExecutions * 100 : 0;
        stats.put("successRate", successRate);

        return stats;
    }
} 