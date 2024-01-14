package uj.wmii.musicevents.dto.mapper.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.ProfileDTO;
import uj.wmii.musicevents.dto.mapper.MusicProfileMapper;
import uj.wmii.musicevents.constants.AccountType;
import uj.wmii.musicevents.model.Profile;

@Component(AccountType.USER)
public class UserMapper extends ProfileMapper {
    @Autowired
    private MusicProfileMapper musicProfileMapper;

    @Override
    public ProfileDTO mapToDTO(Profile profile) {
        return super.mapToDTO(profile)
                .setMusicProfiles(profile.getMusicProfiles()
                        .stream()
                        .map(musicProfileMapper::mapToDTO)
                        .toList());
    }
}
