package uj.wmii.musicevents.dto.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.ProfileDTO;
import uj.wmii.musicevents.dto.mapper.profile.ProfileMapperFactory;
import uj.wmii.musicevents.model.Account;

@Component
public class AccountMapper {
    @Autowired
    private ProfileMapperFactory factory;

    public ProfileDTO mapToDTO(Account account) {
        return factory.getAccountMapper(account.getType())
                .mapToDTO(account.getProfile());
    }
}
