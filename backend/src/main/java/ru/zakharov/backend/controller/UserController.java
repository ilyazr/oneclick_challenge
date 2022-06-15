package ru.zakharov.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.zakharov.backend.dto.UserDTO;
import ru.zakharov.backend.service.UserService;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.createNewUser(userDTO);
    }

}
