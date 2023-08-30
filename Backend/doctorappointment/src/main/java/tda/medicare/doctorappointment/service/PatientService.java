package tda.medicare.doctorappointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tda.medicare.doctorappointment.model.Patient;
import tda.medicare.doctorappointment.repository.PatientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        return patient.orElse(null);
    }

    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long id, Patient updatedPatient) {
        Optional<Patient> patient = patientRepository.findById(id);

        if (patient.isPresent()) {
            updatedPatient.setId(id);
            return patientRepository.save(updatedPatient);
        } else {
            return null;
        }
    }

    public boolean deletePatient(Long id) {
        Optional<Patient> patient = patientRepository.findById(id);

        if (patient.isPresent()) {
            patientRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Patient findByUser(Long id) {
        return patientRepository.findByUserId(id);
    }
}
