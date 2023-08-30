package tda.medicare.doctorappointment.dto;

import tda.medicare.doctorappointment.model.Appointment;
import tda.medicare.doctorappointment.model.Doctor;
import tda.medicare.doctorappointment.model.Patient;

public class AppointmentDto {
    private Appointment appointment;
    private Doctor doctor;
    private Patient patient;

    public AppointmentDto(Appointment appointment, Doctor doctor, Patient patient) {
        this.appointment = appointment;
        this.doctor = doctor;
        this.patient = patient;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public String toString() {
        return "AppointmentDto{" +
                "appointment=" + appointment +
                ", doctor=" + doctor +
                ", patient=" + patient +
                '}';
    }
}
