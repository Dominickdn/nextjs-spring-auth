package com.domsecurity.security.auth;


import com.domsecurity.security.auth.resetpassword.PasswordResetService;
import com.domsecurity.security.auth.resetpassword.PasswordResetToken;
import com.domsecurity.security.auth.resetpassword.PasswordResetTokenRepository;
import com.domsecurity.security.auth.resetpassword.ResetPasswordRequest;
import com.domsecurity.security.emailservice.EmailDetails;
import com.domsecurity.security.emailservice.EmailService;
import com.domsecurity.security.exceptions.EmailNotFoundException;
import com.domsecurity.security.exceptions.TooManyRequestsException;
import com.domsecurity.security.ratelimiter.ForgotPasswordRateLimiterService;
import com.domsecurity.security.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final PasswordResetService passwordResetService;
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final ForgotPasswordRateLimiterService forgotPasswordRateLimiterService;

    @Value("${nextjs.site.url}")
    private String siteUrl;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = service.register(request);

        ResponseCookie cookie = ResponseCookie.from("token", authResponse.getToken())
                .httpOnly(true)
                .secure(false) // set to true in production with HTTPS
                .path("/")
                .maxAge(60 * 60) // 1 hour
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of("message", "User registered and cookie set"));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
        AuthenticationResponse authResponse = service.authenticate(request);

        ResponseCookie cookie = ResponseCookie.from("token", authResponse.getToken())
                .httpOnly(true)
                .secure(false) // set to true in production
                .path("/")
                .maxAge(60 * 60)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of("message", "User authenticated and cookie set"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Clear the cookie by setting maxAge to 0
        ResponseCookie cookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .secure(false) // true in production (with HTTPS)
                .path("/")
                .maxAge(0) // <--- This clears the cookie
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody PasswordResetToken.ForgotPasswordRequest request) {
        // Check rate limit
        String email = request.getEmail();
        if (!forgotPasswordRateLimiterService.tryConsumeToken(email)) {
            throw new TooManyRequestsException("You have exceeded the limit of 3 password reset requests per day.");
        }

        var user = userRepository.findByEmailIgnoreCase(request.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("Email not registered"));

        // Generate reset token
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiryDate(LocalDateTime.now().plusHours(1))
                .build();
        tokenRepository.save(resetToken);

        // Send reset email
        String resetLink = siteUrl + "/reset-password?token=" + token;
        String emailBody = "Click the link to reset your password: " + resetLink;

        emailService.sendSimpleMail(new EmailDetails(
                user.getUsername(),
                emailBody,
                "Password Reset Request"
        ));

        return ResponseEntity.ok(Map.of("message","Password reset email sent" ));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            passwordResetService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password successfully reset"));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }
}
//    THE BELOW IS TO STORE A TOKEN IN LOCAL STORAGE

//    @PostMapping("/register")
//    public ResponseEntity<AuthenticationResponse> register(
//            @RequestBody RegisterRequest request
//    ) {
//        return ResponseEntity.ok(service.register(request));
//    }
//
//    @PostMapping("/authenticate")
//    @CrossOrigin(origins = "http://localhost:3000")
//    public ResponseEntity<AuthenticationResponse> authenticate(
//            @RequestBody AuthenticationRequest request
//    ) {
//        return ResponseEntity.ok(service.authenticate(request));
//    }
//}
