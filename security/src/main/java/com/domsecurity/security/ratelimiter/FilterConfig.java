package com.domsecurity.security.ratelimiter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<RateLimitingFilter> filter() {
        FilterRegistrationBean<RateLimitingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new RateLimitingFilter());
        registrationBean.addUrlPatterns("/api/v1/auth*"); // Apply only to auth endpoints
        registrationBean.setOrder(1); // Ensure this runs early in the chain
        return registrationBean;
    }
}
