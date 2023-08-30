package tda.medicare.doctorappointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tda.medicare.doctorappointment.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    // Add any custom repository methods if needed
    Patient findByUserId(Long id);
}

