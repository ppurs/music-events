package uj.wmii.musicevents.dto.mapper.profile;

import uj.wmii.musicevents.dto.ProfileDTO;
import uj.wmii.musicevents.model.Profile;


public abstract class ProfileMapper {
    public ProfileDTO mapToDTO(Profile profile) {
        return new ProfileDTO()
                .setEmail(profile.getEmail())
                .setFirstName(profile.getFirstName())
                .setLastName(profile.getLastName());
    }
}
