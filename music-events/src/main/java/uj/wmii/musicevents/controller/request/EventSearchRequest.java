package uj.wmii.musicevents.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventSearchRequest {
    EventFilterRequest filter;
    int offset;
}
