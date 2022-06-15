package ru.zakharov.backend.config.auth;

import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.zakharov.backend.service.AuthService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtVerifierFilter extends OncePerRequestFilter {

    private final RequestMatcher signupPath = new AntPathRequestMatcher("/signup");
    private final RequestMatcher healthCheckPath = new AntPathRequestMatcher("/health");

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtConfig jwtConfig;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse resp,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (signupPath.matches(req) || healthCheckPath.matches(req)) {
            filterChain.doFilter(req, resp);
            return;
        }
        String authHeader = req.getHeader(jwtConfig.getHeaderName());
        if ((authHeader == null || authHeader.isEmpty()) || !authHeader.startsWith(jwtConfig.getTokenPrefix() + " ")) {
            resp.setStatus(403);
        } else {
            String jwt = authHeader.split(" ")[1];
            try {
                Authentication authentication = authService.processJwtTokenData(jwt);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (JwtException exc) {
                throw new IllegalStateException(String.format("Token %s cannot be trusted!", jwt));
            }
            filterChain.doFilter(req, resp);
        }
    }
}
