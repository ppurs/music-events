package uj.wmii.musicevents.dto.mapper.profile;

import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.ProfileDTO;
import uj.wmii.musicevents.constants.AccountType;
import uj.wmii.musicevents.model.Profile;

@Component(AccountType.ORGANIZER)
public class OrganizerMapper extends UserMapper {
    @Override
    public ProfileDTO mapToDTO(Profile profile) {
        return super.mapToDTO(profile)
                .setOrganizationName(profile.getOrganizationName());
    }
}
