package com.sinergia.challenge.services;

import com.sinergia.challenge.dto.MailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public  EmailService(JavaMailSender javaMailSender){
        this.javaMailSender=javaMailSender;
    }

    public  void sendEmail(MailRequest mail){
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        try {

            mimeMessageHelper.setTo(mail.getEmail());
            mimeMessageHelper.setSubject(mail.getSubject());
            mimeMessageHelper.setFrom("juanc6v@gmail.com");
            mimeMessageHelper.setText("clave nueva",true);

            new Thread(() -> {

                System.out.println("Sending mail...");
                javaMailSender.send(mimeMessage);
                System.out.println("Mail sent successfully...");
            }).start();

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }

}
