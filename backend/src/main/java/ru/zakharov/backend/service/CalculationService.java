package ru.zakharov.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.zakharov.backend.config.auth.JwtUserDetails;
import ru.zakharov.backend.domain.CalculationResult;
import ru.zakharov.backend.repository.CalculationResultRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CalculationService {

    private final CalculationResultRepository calculationResultRepository;
    private final AuthService authService;

    public List<CalculationResult> getAllCalculationResultsOfUser(String userId) {
        return calculationResultRepository.getAllByUserId(userId);
    }

    public List<CalculationResult> getAllCalculationResultsOfPrincipal() {
        JwtUserDetails userDetails = authService.getAuthenticatedUserDetails();
        return getAllCalculationResultsOfUser(userDetails.getUserId());
    }

    public void savePrincipalCalculations(List<CalculationResult> calculationResults) {
        String principalId = authService.getPrincipalId();
        calculationResults.forEach(result -> {
            result.setUserId(principalId);
            calculationResultRepository.save(result);
        });
    }
}
