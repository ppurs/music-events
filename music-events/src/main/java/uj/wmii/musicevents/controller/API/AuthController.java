package uj.wmii.musicevents.controller.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.request.AuthRequest;
import uj.wmii.musicevents.controller.response.LoginResponse;
import uj.wmii.musicevents.controller.response.Response;
import uj.wmii.musicevents.controller.response.Token;
import uj.wmii.musicevents.service.JwtService;
import uj.wmii.musicevents.service.UserAccountDetailsService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class AuthController {
    @Autowired
    private UserAccountDetailsService service;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/auth/login")
    public ResponseEntity<Response> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        LoginResponse response = new LoginResponse();

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

            if (authentication.isAuthenticated()) {
                List<String> roles = service.loadUserByUsername(authRequest.getEmail()).getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());
                response.setRoles(roles);
                response.setToken(new Token(jwtService.generateToken(authRequest.getEmail())));
                response.setResult(true);

            }
            else {
                response.setResult(false);
            }
        }
        catch (AuthenticationException e) {
            response.setResult(false);
        }

        return ResponseEntity.ok(response);
    }

}
