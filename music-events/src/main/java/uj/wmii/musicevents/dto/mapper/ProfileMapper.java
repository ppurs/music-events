package uj.wmii.musicevents.dto.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.ProfileDTO;
import uj.wmii.musicevents.model.Profile;

@Component
public class ProfileMapper {
    @Autowired
    private MusicProfileMapper musicProfileMapper;

    public ProfileDTO mapToDTO(Profile profile) {
        return new ProfileDTO()
                .setEmail(profile.getEmail())
                .setFirstName(profile.getFirstName())
                .setLastName(profile.getLastName())
                .setMusicProfiles(profile.getMusicProfiles()
                                .stream()
                                .map(musicProfileMapper::mapToDTO)
                                .toList())
                .setOrganizationName(profile.getOrganizationName());
    }
}
