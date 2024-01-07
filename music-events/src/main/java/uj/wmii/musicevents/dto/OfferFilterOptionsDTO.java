package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class OfferFilterOptionsDTO {
    List<String> cities;
    List<String> types;
    List<String> genres;
}
