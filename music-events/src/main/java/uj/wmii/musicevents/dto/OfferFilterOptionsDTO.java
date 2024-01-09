package uj.wmii.musicevents.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class OfferFilterOptionsDTO {
    private List<String> cities;
    private List<String> types;
    private List<String> genres;
}
