package com.domsecurity.security.ratelimiter;

import io.github.bucket4j.*;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ForgotPasswordRateLimiterService {

    private final Map<String, Bucket> forgotPasswordBuckets = new ConcurrentHashMap<>();

    private Bucket createForgotPasswordBucket() {
        Bandwidth limit = Bandwidth.classic(3, Refill.intervally(3, Duration.ofDays(1)));
        return Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    public boolean tryConsumeToken(String email) {
        String key = email.toLowerCase();
        Bucket bucket = forgotPasswordBuckets.computeIfAbsent(key, k -> createForgotPasswordBucket());
        return bucket.tryConsume(1);
    }
}
