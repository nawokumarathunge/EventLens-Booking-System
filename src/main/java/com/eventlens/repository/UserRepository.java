package com.eventlens.repository;
import com.eventlens.entity.User;
import com.eventlens.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findByRole(Role role);

    long countByRole(Role role);

    List<User> findByRoleAndNameContainingIgnoreCase(Role role, String keyword);


}


