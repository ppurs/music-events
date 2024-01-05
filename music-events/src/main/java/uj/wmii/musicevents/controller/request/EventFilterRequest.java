package uj.wmii.musicevents.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventFilterRequest {
    String search;
    String startDate;
    String endDate;
    String[] cities;
    String[] types;
    String[] genres;
}
