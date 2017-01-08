package com.university.controllers;

import com.university.domain.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessagesService {

    private final SimpMessagingTemplate template;

    @Autowired
    public MessagesService(SimpMessagingTemplate template) {
        this.template = template;
    }

    void sendMessage(String chatId, Message message) throws Exception {
        this.template.convertAndSend("/chat/" + chatId, message);
    }
}
