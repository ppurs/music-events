package uj.wmii.musicevents.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse extends Response {
    Collection<String> roles;
    Token token;
}



