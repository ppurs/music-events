package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class OfferDTO {
    int id;
    String title;
    String description;
    String city;
    String location;
    String date;
    String type;
    String genre;
    String organizer;
}
