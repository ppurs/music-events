package uj.wmii.musicevents.service;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.dto.ProfileDTO;
import uj.wmii.musicevents.dto.mapper.AccountMapper;
import uj.wmii.musicevents.model.Account;
import uj.wmii.musicevents.model.MusicProfile;
import uj.wmii.musicevents.model.UserAccount;
import uj.wmii.musicevents.repository.AccountRepository;

import java.util.Optional;

@Service
public class UserAccountDetailsService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private MusicProfileService musicProfileService;

    @Autowired
    private AccountMapper mapper;

    @Autowired
    private PasswordEncoder encoder;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> userDetail = accountRepository.findByEmail(email);

        return userDetail.map(UserAccountDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User with email: " + email + " not found." ));
    }

    public ProfileDTO getProfileDetails(int userId) {
        Optional<Account> account = accountRepository.findById(userId);

        return mapper.mapToDTO(account.get());
    }

    public int addMusicProfile(int userId, MusicProfile profile) {
        profile.setUser(entityManager.getReference(UserAccount.class, userId));

        return musicProfileService.addMusicProfile(profile);
    }
}