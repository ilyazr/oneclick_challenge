package ru.zakharov.backend.dto;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private Boolean enabled;

}
