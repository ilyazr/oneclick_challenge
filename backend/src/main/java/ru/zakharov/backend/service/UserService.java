package ru.zakharov.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import ru.zakharov.backend.dto.UserDTO;
import ru.zakharov.backend.domain.User;
import ru.zakharov.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDTO mapUserToDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .email(user.getEmail())
                .enabled(user.getEnabled())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                String.format("User with username %s not found!", username)));
    }

    public UserDTO createNewUser(UserDTO dto) {
        User user = new User(
                dto.getUsername(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getPassword(),
                dto.getEmail(),
                true
        );
        User newUser = userRepository.save(user);
        return mapUserToDto(newUser);
    }
}
