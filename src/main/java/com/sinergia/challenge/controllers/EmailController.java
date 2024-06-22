package com.sinergia.challenge.controllers;

import com.sinergia.challenge.dto.AuthResponse;
import com.sinergia.challenge.dto.MailRequest;
import com.sinergia.challenge.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/recovery")
    public ResponseEntity<MailRequest> recoveyAccount(@RequestParam String email){
        return ResponseEntity.ok(emailService.sendNewPassword(email));
    }
}
