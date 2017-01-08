package com.university.controllers;

import com.university.domain.Message;
import com.university.domain.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/rest")
public class ChatController {

    private final MessagesService messagesService;

    @Autowired
    public ChatController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @RequestMapping(value = "/relay", method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.OK)
    public void relayMessage(@RequestBody Request request) throws Exception {
        System.out.println(request);
        messagesService.sendMessage(request.getChatId(), new Message(request.getAuthor(), request.getMessage()));
    }
}
