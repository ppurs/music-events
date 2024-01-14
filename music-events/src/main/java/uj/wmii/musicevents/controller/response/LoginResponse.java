package uj.wmii.musicevents.controller.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class LoginResponse extends Response {
    Collection<String> roles;
    Token token;

    public LoginResponse(Collection<String> roles, Token token, boolean result) {
        super(result);

        this.roles = roles;
        this.token = token;
    }

    public LoginResponse(Collection<String> roles, Token token, boolean result, String error) {
        super(result, error);

        this.roles = roles;
        this.token = token;
    }
}



