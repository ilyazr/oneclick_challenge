package ru.zakharov.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ru.zakharov.backend.config.auth.JwtConfig;
import ru.zakharov.backend.config.auth.JwtUserDetails;
import ru.zakharov.backend.domain.User;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AuthService {

    private final JwtConfig jwtConfig;

    enum TokenType {
        ACCESS, REFRESH
    }

    public Jws<Claims> parseJwt(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes()))
                .build()
                .parseClaimsJws(jwt);
    }

    @SuppressWarnings(value = "unchecked")
    public UsernamePasswordAuthenticationToken processJwtTokenData(String token) throws JwtException {
        Jws<Claims> claimsJws = parseJwt(token);
        Claims body = claimsJws.getBody();
        String id = (String) body.get("uid");
        String username = body.getSubject();
        String email = (String) body.get("email");
        String firstName = (String) body.get("firstName");
        String lastName = (String) body.get("lastName");

        var authorities = (List<String>) body.get("authorities");
        Set<SimpleGrantedAuthority> simpleGrantedAuthorities = null;
        if (authorities != null) {
            simpleGrantedAuthorities = authorities.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toSet());
        }
        return new UsernamePasswordAuthenticationToken(
                JwtUserDetails.builder()
                        .userId(id)
                        .username(username)
                        .firstName(firstName)
                        .lastName(lastName)
                        .email(email)
                        .token(token)
                        .authorities(simpleGrantedAuthorities)
                        .build(),
                null,
                simpleGrantedAuthorities
        );
    }

    public String createJwtAccessToken(User principal, Collection<? extends GrantedAuthority> authorities) {
        return Jwts.builder()
                .setSubject(principal.getUsername())
                .claim("uid", principal.getId())
                .claim("firstName", principal.getFirstName())
                .claim("lastName", principal.getLastName())
                .claim("username", principal.getUsername())
                .claim("email", principal.getEmail())
                .claim("authorities", authorities)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(getExpirationDate(TokenType.ACCESS))
                .signWith(Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes()))
                .compact();
    }

    private Date getExpirationDate(TokenType tokenType) {
        Integer seconds = jwtConfig.getAccessTokenExpiresAfterSeconds();
        return Date.from(
                LocalDateTime.now()
                        .plusSeconds(seconds)
                        .atZone(ZoneId.systemDefault())
                        .toInstant()
        );
    }

    public JwtUserDetails getAuthenticatedUserDetails() {
        return (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public String getPrincipalId() {
        return getAuthenticatedUserDetails().getUserId();
    }
}
