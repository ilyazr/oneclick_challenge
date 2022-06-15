package ru.zakharov.backend.config.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@ConfigurationProperties(prefix = "auth")
@Getter
@Setter
@NoArgsConstructor
public class JwtConfig {

    private String secret;
    private Integer accessTokenExpiresAfterSeconds;
    private String headerName;
    private String tokenPrefix;

}
