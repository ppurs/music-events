package uj.wmii.musicevents.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import uj.wmii.musicevents.model.UserAccount;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserAccountDetails implements UserDetails {
    private int id;
    private String email;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserAccountDetails(UserAccount userAccount) {
        id = userAccount.getId();
        email = userAccount.getEmail();
        password = userAccount.getPassword();
        authorities = userAccount.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public int getId() {
        return this.id;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
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
        return true;
    }
}