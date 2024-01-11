package uj.wmii.musicevents.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Profile {
    private String email;
    private String firstName;
    private String lastName;
    private String organizationName;
    private List<MusicProfile> musicProfiles;
}
