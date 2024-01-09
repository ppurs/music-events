package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class EventDTO {
    private int id;
    private String title;
    private String description;
    private String[] performers;
    private String city;
    private String location;
    private String date;
    private String type;
    private String genre;
    private BigDecimal price;
    private boolean ticketsAvailable;
}