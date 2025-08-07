package com.example.demo.secureapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.List;
import java.util.Random;

@Service
public class EmailService {

    private static final String TEMPLATE_PATH = "email/verification"; // Relative to templates folder

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    private final List<String> motivationalQuotes = List.of(
        "The secret of getting ahead is getting started. - Mark Twain",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "It always seems impossible until it's done. - Nelson Mandela",
        "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Your limitation—it's only your imagination. - Unknown",
        "Push yourself, because no one else is going to do it for you. - Unknown",
        "Great things never come from comfort zones. - Unknown",
        "Dream it. Wish it. Do it. - Unknown"
    );

    private final List<String> emailTemplates = List.of(
        "blue-template",
        "green-template",
        "purple-template",
        "orange-template"
    );

    public void sendVerificationEmail(String to, String verificationCode) throws MessagingException {
        Random random = new Random();
        String quote = motivationalQuotes.get(random.nextInt(motivationalQuotes.size()));
        String template = emailTemplates.get(random.nextInt(emailTemplates.size()));
        
        Context context = new Context();
        context.setVariable("verificationCode", verificationCode);
        context.setVariable("motivationalQuote", quote);
        context.setVariable("template", template);
        
        String emailContent = templateEngine.process(TEMPLATE_PATH, context);
        
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject("Your SecureNest Verification Code");
        helper.setText(emailContent, true);
        
        mailSender.send(message);
    }
}