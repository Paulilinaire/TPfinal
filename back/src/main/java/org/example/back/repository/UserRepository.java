package org.example.back.repository;

import org.example.back.entity.Role;
import org.example.back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User searchUserByRole(Role role);
}
