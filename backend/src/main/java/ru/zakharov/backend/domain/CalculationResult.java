package ru.zakharov.backend.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "calculation_results")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalculationResult {

    private String userId;
    private Object resource;
    private Integer quantity;
    private String impactGWP100_kgCO2e_total;
    private String impactAP_kgSO2e_total;

}
