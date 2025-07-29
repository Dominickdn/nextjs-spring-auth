Custom Authentication Template
This project demonstrates a custom authentication flow built using Spring Boot and Spring Security. This project was created as a learning exercise to better understand security and authentication concepts using modern tools like Spring Boot, Spring Security, JWT, and Next.js.

Features
User Registration (/register)
Login with JWT stored in HTTP-only cookies (/login)
Password Reset via Email (/forgot-password)
Secured Dashboard Endpoint (/dashboardsecured)
Secure password hashing with salt
CORS configuration and environment-based deployment setup
Tech Stack
Frontend
Framework: Next.js
Styling: Tailwind CSS
Backend
Language: Java
Framework: Spring Boot + Spring Security
Database: PostgreSQL
Email: JavaMail with Gmail SMTP
Authentication: JWT (JSON Web Tokens) stored in HTTP-only cookies
Environment Configuration
Backend (application.properties)
Configure your Spring Boot backend with the following environment variables:

server.port=8081
spring.application.name=security

# Database
spring.datasource.url=${POSTGRES_URL}
spring.datasource.username=${POSTGRES_USERNAME}
spring.datasource.password=${POSTGRES_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Security & CORS
cors.allowed-origins=${SITE_NAME}
is.production=${IS_PRODUCTION}
site.url=${SITE_NAME}
site.samesite=${SAME_SITE}
jwt.secret=${JWT_SECRET}
Frontend (.env.local)
Create a .env.local file in the root of your Next.js frontend and add the following:

NEXT_PUBLIC_API_SECURITY=http://localhost:8081
Pages Frontend
Endpoint	Description
/register	Registers a new user
/login	Logs in an existing user
/forgot-password	Sends a password reset email to the user
/dashboardsecured	Protected route; requires a valid JWT
Getting Started
Backend (Spring Boot)
Ensure PostgreSQL is running and accessible.
Set your environment variables or use a .env loader.
Run the backend application:
./mvnw spring-boot:run
Frontend (Next.js)
Install frontend dependencies: npm install

Start the development server:
npm run dev
Notes
Make sure to enable SMTP access for your Gmail account (using App Passwords is recommended).

JWT tokens are stored securely in HTTP-only cookies, which helps protect against XSS attacks.

This project was created as a learning exercise to better understand security and authentication concepts using modern tools like Spring Boot, Spring Security, JWT, and Next.js.

This project is not actively maintained and should not be used in production without further security enhancements and testing.
