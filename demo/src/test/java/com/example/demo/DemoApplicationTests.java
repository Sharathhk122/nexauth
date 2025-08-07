package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // Ensures that application-test.properties is used
public class DemoApplicationTests {

    @Test
    void contextLoads() {
        // This test ensures the Spring ApplicationContext loads successfully
    }

    @Test
    void testPasswordEncoder() {
        // Example test logic; replace with your actual password encoding test
        String rawPassword = "test123";
        org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder encoder =
                new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(rawPassword);

        // Assert that the password matches after encoding
        org.junit.jupiter.api.Assertions.assertTrue(
                encoder.matches(rawPassword, encodedPassword),
                "Encoded password should match the raw password"
        );
    }
}
