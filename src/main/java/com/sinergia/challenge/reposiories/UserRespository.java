package com.sinergia.challenge.reposiories;

import com.sinergia.challenge.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRespository extends JpaRepository<User, Long> {
}
