package com.sinergia.challenge.services;

import com.mifmif.common.regex.Generex;
import com.sinergia.challenge.dto.MailRequest;
import com.sinergia.challenge.entities.User;
import com.sinergia.challenge.reposiories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.sinergia.challenge.utils.RandomPasswordGenerator.generatePassword;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${EMAIL_SENDER}")
    private String email;

    public MailRequest sendNewPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        String newPassword=generatePassword();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        System.out.println(newPassword);
        sendNewMail(email,"Recovery Password", newPassword);

return MailRequest
        .builder()
        .email(email)
        .subject("Contraseña enviada")
        .build();
    }

    private void sendNewMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

}
