package ru.zakharov.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.zakharov.backend.domain.CalculationResult;
import ru.zakharov.backend.service.CalculationService;

import java.util.List;

@RestController
@RequestMapping("/calc")
@RequiredArgsConstructor
public class CalculationController {

    private final CalculationService calculationService;

    @GetMapping
    public List<CalculationResult> getAllCalculationResultsOfPrincipal() {
        return calculationService.getAllCalculationResultsOfPrincipal();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void savePrincipalCalculations(@RequestBody List<CalculationResult> calculationResults) {
        calculationService.savePrincipalCalculations(calculationResults);
    }

}
