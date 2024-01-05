package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class EventDTO {
    int id;
    String title;
    String description;
    String[] performers;
    String city;
    String location;
    String date;
    String type;
    String genre;
    BigDecimal price;
    boolean ticketsAvailable;
}