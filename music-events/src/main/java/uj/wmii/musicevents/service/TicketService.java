package uj.wmii.musicevents.service;

import uj.wmii.musicevents.controller.request.TicketFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.TicketDTO;

import java.util.List;

public interface TicketService {
    List<TicketDTO> getFilteredTickets(SearchRequest<TicketFilterRequest> searchFilter, int userId);
}
