package uj.wmii.musicevents.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingSummaryRequest {
    private int eventId;
    private int noTickets;
}
