package uj.wmii.musicevents.dto.mapper;

import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.MusicProfileDTO;
import uj.wmii.musicevents.model.MusicProfile;

@Component
public class MusicProfileMapper {
    public MusicProfileDTO mapToDTO(MusicProfile profile) {
        return new MusicProfileDTO()
                .setId(profile.getId())
                .setType(profile.getType())
                .setName(profile.getName())
                .setGenre(profile.getGenre())
                .setBandName(profile.getBandName())
                .setInstrument(profile.getInstrument());
    }
}
