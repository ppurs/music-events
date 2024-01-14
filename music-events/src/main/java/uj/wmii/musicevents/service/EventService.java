package uj.wmii.musicevents.service;

import uj.wmii.musicevents.controller.request.EventFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.EventDTO;
import uj.wmii.musicevents.dto.EventFilterOptionsDTO;

import java.util.List;

public interface EventService {
    List<EventDTO> getFilteredEvents(SearchRequest<EventFilterRequest> searchFilter);
    EventFilterOptionsDTO getFilterOptions();
}
