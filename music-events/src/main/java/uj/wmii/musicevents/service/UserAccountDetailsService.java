package uj.wmii.musicevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.model.UserAccount;
import uj.wmii.musicevents.repository.UserAccountRepository;

import java.util.Optional;

@Service
public class UserAccountDetailsService implements UserDetailsService {
    @Autowired
    private UserAccountRepository repository;

    @Autowired
    private PasswordEncoder encoder;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserAccount> userDetail = repository.findByEmail(email);

        return userDetail.map(UserAccountDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User with email: " + email + " not found." ));
    }
}