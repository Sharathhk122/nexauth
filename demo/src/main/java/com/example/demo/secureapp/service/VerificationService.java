// VerificationService.java
package com.example.demo.secureapp.service;

import com.example.demo.secureapp.model.User;
import com.example.demo.secureapp.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Random;

@Service
public class VerificationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public String generateVerificationCode(User user) throws MessagingException {
        Random random = new Random();
        String code = String.format("%06d", random.nextInt(999999));
        
        user.setVerificationCode(code);
        user.setVerificationCodeExpiry(Instant.now().plusSeconds(600).getEpochSecond()); // 10 minutes expiry
        userRepository.save(user);
        
        // This method now throws MessagingException which will be handled by the caller
        emailService.sendVerificationEmail(user.getEmail(), code);
        
        return code;
    }

    public boolean verifyUser(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        if (user.isVerified()) {
            return true;
        }

        if (code.equals(user.getVerificationCode())) {
            if (Instant.now().getEpochSecond() < user.getVerificationCodeExpiry()) {
                user.setVerified(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiry(null);
                userRepository.save(user);
                return true;
            }
            throw new RuntimeException("Verification code has expired");
        }
        
        return false;
    }
}