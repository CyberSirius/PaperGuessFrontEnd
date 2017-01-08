package com.university.domain;

public class Message {
    private String author;
    private String message;

    public Message(String author, String message) {
        this.setAuthor(author);
        this.setMessage(message);
    }

    public String getAuthor() {
        return author;
    }

    private void setAuthor(String author) {
        this.author = author;
    }

    public String getMessage() {
        return message;
    }

    private void setMessage(String message) {
        this.message = message;
    }
}
