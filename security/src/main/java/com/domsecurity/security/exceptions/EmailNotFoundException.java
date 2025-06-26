package com.domsecurity.security.exceptions;

public class EmailNotFoundException extends RuntimeException {
    public EmailNotFoundException(String message) {
      super(message);
    }
}
