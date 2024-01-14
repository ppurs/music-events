package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class MusicProfileDTO {
    private int id;
    private String type;
    private String name;
    private String bandName;
    private String genre;
    private String instrument;
}
