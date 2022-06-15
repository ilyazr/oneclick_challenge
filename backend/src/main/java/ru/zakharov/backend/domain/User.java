package ru.zakharov.backend.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Pattern;
import java.util.Collection;

@Data
@Document(collection = "users")
public class User implements UserDetails {

    @Id
    private String id;

    @Pattern(regexp = "^[^\\d]+$")
    private String firstName;
    @Pattern(regexp = "^[^\\d]+$")
    private String lastName;

    @Indexed(unique = true)
    private String username;
    @Pattern(regexp = "^[^\\s]{6,20}$")
    private String password;
    @Indexed(unique = true)
    @Pattern(regexp = "^([^@\\s]+)@([a-zA-Z]+)\\.([a-zA-Z]+)$")
    private String email;
    private Boolean enabled;

    public User(String username,
                String firstName,
                String lastName,
                String password,
                String email,
                Boolean enabled) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.enabled = enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
