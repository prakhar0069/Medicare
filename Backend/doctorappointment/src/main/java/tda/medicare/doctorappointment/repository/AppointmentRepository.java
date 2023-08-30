package tda.medicare.doctorappointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tda.medicare.doctorappointment.model.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Add any custom repository methods if needed
    List<Appointment> findByDoctorId(Long id);
    List<Appointment> findByPatientId(Long id);
}

