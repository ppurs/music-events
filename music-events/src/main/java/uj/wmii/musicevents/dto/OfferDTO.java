package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class OfferDTO {
    private int id;
    private String title;
    private String description;
    private String city;
    private String location;
    private String date;
    private String type;
    private String genre;
    private String organizer;
}
