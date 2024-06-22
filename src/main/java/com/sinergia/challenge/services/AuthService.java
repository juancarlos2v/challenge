package com.sinergia.challenge.services;

import com.sinergia.challenge.dto.AuthResponse;
import com.sinergia.challenge.dto.LoginRequest;
import com.sinergia.challenge.dto.RegisterRequest;
import com.sinergia.challenge.entities.User;
import com.sinergia.challenge.enums.Role;
import com.sinergia.challenge.exceptions.DuplicatedEmailException;
import com.sinergia.challenge.exceptions.InvalidSessionException;
import com.sinergia.challenge.reposiories.UserRepository;
import com.sinergia.challenge.utils.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        try {
            Validator.isValidate(request.getEmail(), request.getPassword());

        } catch (InvalidSessionException e) {
            return AuthResponse.builder()
                    .token(null)
                    .response("Usuario/contraseña incorrecta")
                    .success(false)
                    .build();
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .response("Login ok")
                .success(true)
                .build();


    }

    public AuthResponse register(RegisterRequest request) {
        try {
            Validator.isValidate(request.getEmail(), request.getPassword());
            User user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .name(request.getName())
                    .lastName(request.getLastName())
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
            return AuthResponse.builder()
                    .token(jwtService.getToken(user))
                    .response("Registro ok")
                    .success(true)
                    .build();

        }
        catch (DataIntegrityViolationException e){
            return AuthResponse.builder()
                    .token(null)
                    .response("Email ya esta en uso")
                    .success(false)
                    .build();
        }
        catch (InvalidSessionException e) {
            return AuthResponse.builder()
                    .token(null)
                    .response("Usuario/contraseña incorrecta")
                    .success(false)
                    .build();
    }
}
}
