package com.university.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/rest")
public class ChatController {

    private final CommunicationService communicationService;

    @Autowired
    public ChatController(CommunicationService communicationService) {
        this.communicationService = communicationService;
    }

    @RequestMapping(value = "/relay", method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.OK)
    public void relayMessage(@RequestBody ObjectNode node) throws Exception {
        communicationService.sendMessage(node.get("destination").asText(), node.get("payload"));
    }
}
