package com.sinergia.challenge.controllers;

import com.sinergia.challenge.dto.AuthResponse;
import com.sinergia.challenge.dto.LoginRequest;
import com.sinergia.challenge.dto.RegisterRequest;
import com.sinergia.challenge.exceptions.InvalidSessionException;
import com.sinergia.challenge.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        if (!response.getSuccess() ) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        if (!response.getSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(authService.register(request));
    }
}

