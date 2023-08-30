package tda.medicare.doctorappointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tda.medicare.doctorappointment.model.Doctor;
import tda.medicare.doctorappointment.repository.DoctorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        return doctor.orElse(null);
    }

    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {
        Optional<Doctor> doctor = doctorRepository.findById(id);

        if (doctor.isPresent()) {
            updatedDoctor.setId(id);
            return doctorRepository.save(updatedDoctor);
        } else {
            return null;
        }
    }

    public boolean deleteDoctor(Long id) {
        Optional<Doctor> doctor = doctorRepository.findById(id);
        if (doctor.isPresent()) {
            doctorRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Doctor findByUser(Long id) {
        System.out.println("Doctor: "+ doctorRepository.findByUserId(id));
        return doctorRepository.findByUserId(id);
    }
}
