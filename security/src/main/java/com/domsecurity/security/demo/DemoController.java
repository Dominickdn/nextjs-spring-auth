package com.domsecurity.security.demo;

import com.domsecurity.security.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/demo-controller")
public class DemoController {

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_USER')") // or just "isAuthenticated()" for basic check
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal User user) {
        // `user` is the currently authenticated user loaded via JWT token from cookie
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "firstname", user.getFirstname(),
                "lastname", user.getLastname(),
                "email", user.getEmail()
        ));
    }
}
