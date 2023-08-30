package tda.medicare.doctorappointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import tda.medicare.doctorappointment.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
