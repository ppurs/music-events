package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ProfileDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String organizationName;
    private List<MusicProfileDTO> musicProfiles;
}
