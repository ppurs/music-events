package uj.wmii.musicevents.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfferFilterRequest {
    private String startDate;
    private String endDate;
    private String[] cities;
    private String[] types;
    private String[] genres;
}
