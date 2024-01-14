package uj.wmii.musicevents.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventFilterRequest {
    private String search;
    private Date startDate;
    private Date endDate;
    private String[] cities;
    private String[] types;
    private String[] genres;
}
