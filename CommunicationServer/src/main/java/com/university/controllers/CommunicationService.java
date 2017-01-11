package com.university.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class CommunicationService {

    private final SimpMessagingTemplate template;

    @Autowired
    public CommunicationService(SimpMessagingTemplate template) {
        this.template = template;
    }

    void sendMessage(String destination, JsonNode payload) throws Exception {
        this.template.convertAndSend("/chat/" + destination, payload);
    }
}
