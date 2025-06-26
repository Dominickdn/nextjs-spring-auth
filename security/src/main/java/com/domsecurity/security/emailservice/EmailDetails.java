package com.domsecurity.security.emailservice;

public class EmailDetails {
    private String recipient;
    private String msgBody;
    private String subject;

    public EmailDetails() {
    }

    public EmailDetails(String recipient, String msgBody, String subject) {
        this.recipient = recipient;
        this.msgBody = msgBody;
        this.subject = subject;
    }

    public String getRecipient() {
        return this.recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getMsgBody() {
        return this.msgBody;
    }

    public void setMsgBody(String msgBody) {
        this.msgBody = msgBody;
    }

    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String toString() {
        return "EmailDetails{recipient='" + this.recipient + "', msgBody='" + this.msgBody + "', subject='" + this.subject + "'}";
    }
}
