package ru.zakharov.backend.config.auth;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Setter
@ToString
@Builder
public class JwtUserDetails {

    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String token;
    private Collection<? extends GrantedAuthority> authorities;

}
