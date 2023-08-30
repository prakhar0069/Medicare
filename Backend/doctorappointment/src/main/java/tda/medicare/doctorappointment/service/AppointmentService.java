package tda.medicare.doctorappointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tda.medicare.doctorappointment.model.Appointment;
import tda.medicare.doctorappointment.repository.AppointmentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment getAppointmentById(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);
        return appointment.orElse(null);
    }

    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);

        if (appointment.isPresent()) {
            updatedAppointment.setId(id);
            return appointmentRepository.save(updatedAppointment);
        } else {
            return null;
        }
    }

    public boolean deleteAppointment(Long id) {
        Optional<Appointment> appointment = appointmentRepository.findById(id);

        if (appointment.isPresent()) {
            appointmentRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public List<Appointment> getAllAppointmentsByDoctor(Long id) {
        return appointmentRepository.findByDoctorId(id);
    }

    public List<Appointment> getAllAppointmentsByPatient(Long id) {
        return appointmentRepository.findByPatientId(id);
    }
}
