package ru.zakharov.backend.config.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ru.zakharov.backend.domain.User;
import ru.zakharov.backend.service.AuthService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;
    private AuthService authService;
    private ObjectMapper mapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse resp) throws AuthenticationException {
        try {
            UsernameAndPasswordRequest usernameAndPasswordRequest =
                    mapper.readValue(req.getInputStream(), UsernameAndPasswordRequest.class);
            log.info("Authentication attempt as user {}", usernameAndPasswordRequest.getUsername());
            Authentication authRequest = new UsernamePasswordAuthenticationToken(
                    usernameAndPasswordRequest.getUsername(),
                    usernameAndPasswordRequest.getPassword()
            );
            return authenticationManager.authenticate(authRequest);

        } catch (IOException exc) {
            throw new RuntimeException(exc);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        log.info("Successful authentication as {}", authResult.getName());
        User principal = ((User) authResult.getPrincipal());
        String accessToken = authService.createJwtAccessToken(principal, authResult.getAuthorities());
        response.addHeader("access-token", accessToken);
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        JwtUserDetails.builder()
                                .userId(principal.getId())
                                .username(principal.getUsername())
                                .firstName(principal.getFirstName())
                                .lastName(principal.getLastName())
                                .email(principal.getEmail())
                                .token(accessToken)
                                .authorities(authResult.getAuthorities())
                                .build(),
                        null,
                        authResult.getAuthorities()
                )
        );
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        super.unsuccessfulAuthentication(request, response, failed);
    }

    @Override
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
        this.authenticationManager = authenticationManager;
    }

    @Autowired
    public void setAuthService(AuthService authService) {
        this.authService = authService;
    }

    @Autowired
    public void setMapper(ObjectMapper mapper) {
        this.mapper = mapper;
    }
}
