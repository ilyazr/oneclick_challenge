package ru.zakharov.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.zakharov.backend.domain.CalculationResult;

import java.util.List;

public interface CalculationResultRepository extends MongoRepository<CalculationResult, String> {

    List<CalculationResult> getAllByUserId(String userId);

}
