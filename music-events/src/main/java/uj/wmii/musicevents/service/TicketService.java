package uj.wmii.musicevents.service;

import uj.wmii.musicevents.controller.request.BookingSummaryRequest;
import uj.wmii.musicevents.controller.request.TicketFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.TicketDTO;

import java.math.BigDecimal;
import java.util.List;

public interface TicketService {
    List<TicketDTO> getFilteredTickets(SearchRequest<TicketFilterRequest> searchFilter, int userId);
    int bookTickets(int eventId, int noTickets, int userId);
    void confirmPayment(int orderId);
    void cancelOrder(int orderId);
    int findNoAvailableTickets(int eventId);
    boolean checkAllTicketsSold(int eventId);
    BigDecimal calculateOrderSummary(BookingSummaryRequest request);
}
