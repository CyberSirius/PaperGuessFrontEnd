package com.university.domain;

public class Request {
    private String author;
    private String message;
    private String chatId;

    @Override
    public String toString() {
        return "Request{" +
                "author='" + author + '\'' +
                ", message='" + message + '\'' +
                ", chatId='" + chatId + '\'' +
                '}';
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }
}
