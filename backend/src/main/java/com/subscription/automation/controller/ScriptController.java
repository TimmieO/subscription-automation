package com.subscription.automation.controller;

import com.subscription.automation.model.Script;
import com.subscription.automation.model.ScriptExecution;
import com.subscription.automation.repository.ScriptExecutionRepository;
import com.subscription.automation.repository.ScriptRepository;
import com.subscription.automation.service.ScriptService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/scripts")
public class ScriptController {

    private final ScriptRepository scriptRepository;
    private final ScriptExecutionRepository scriptExecutionRepository;
    private final ScriptService scriptService;

    public ScriptController(
        ScriptRepository scriptRepository,
        ScriptExecutionRepository scriptExecutionRepository,
        ScriptService scriptService
    ) {
        this.scriptRepository = scriptRepository;
        this.scriptExecutionRepository = scriptExecutionRepository;
        this.scriptService = scriptService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Script>> getAllScripts() {
        List<Script> scripts = scriptRepository.findAll();
        return ResponseEntity.ok(scripts);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Script> getScript(@PathVariable Long id) {
        Optional<Script> script = scriptRepository.findById(id);
        return script.map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Script> createScript(@RequestBody Script script) {
        Script savedScript = scriptRepository.save(script);
        return ResponseEntity.ok(savedScript);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Script> updateScript(@PathVariable Long id, @RequestBody Script script) {
        if (!scriptRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        script.setId(id);
        Script updatedScript = scriptRepository.save(script);
        return ResponseEntity.ok(updatedScript);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteScript(@PathVariable Long id) {
        if (!scriptRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        scriptRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/execute")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ScriptExecution> executeScript(@PathVariable Long id) {
        Optional<Script> script = scriptRepository.findById(id);
        if (script.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ScriptExecution execution = scriptService.executeScript(script.get());
        return ResponseEntity.ok(execution);
    }

    @GetMapping("/{id}/executions")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<ScriptExecution>> getScriptExecutions(
        @PathVariable Long id,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String status,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        if (!scriptRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("startedAt").descending());
        Page<ScriptExecution> executions;
        
        if (status != null && !status.isEmpty()) {
            if (startDate != null && endDate != null) {
                executions = scriptExecutionRepository.findByScriptIdAndStatusAndStartedAtBetween(
                    id, status, startDate, endDate, pageable
                );
            } else {
                executions = scriptExecutionRepository.findByScriptIdAndStatus(id, status, pageable);
            }
        } else {
            if (startDate != null && endDate != null) {
                executions = scriptExecutionRepository.findByScriptIdAndStartedAtBetween(
                    id, startDate, endDate, pageable
                );
            } else {
                executions = scriptExecutionRepository.findByScriptId(id, pageable);
            }
        }

        return ResponseEntity.ok(executions);
    }

    @GetMapping("/{id}/stats")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, Object>> getScriptStats(@PathVariable Long id) {
        if (!scriptRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> stats = scriptService.getScriptStats(id);
        return ResponseEntity.ok(stats);
    }
} 