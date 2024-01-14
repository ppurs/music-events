package uj.wmii.musicevents.controller.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.request.BookTicketsRequest;
import uj.wmii.musicevents.controller.request.BookingSummaryRequest;
import uj.wmii.musicevents.controller.request.ConfirmationRequest;
import uj.wmii.musicevents.controller.request.EventFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.controller.response.BookResponse;
import uj.wmii.musicevents.controller.response.BookingSummaryResponse;
import uj.wmii.musicevents.controller.response.Response;
import uj.wmii.musicevents.dto.EventDTO;
import uj.wmii.musicevents.dto.EventFilterOptionsDTO;
import uj.wmii.musicevents.service.EventService;
import uj.wmii.musicevents.service.TicketService;
import uj.wmii.musicevents.service.UserAccountDetails;

import java.util.List;

@RestController
@RequestMapping(value = "/events", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class EventController {
    @Autowired
    private EventService eventService;

    @Autowired
    private TicketService ticketService;

    @PostMapping("/list")
    public ResponseEntity<List<EventDTO>> getEventsList(@RequestBody SearchRequest<EventFilterRequest> request) {
        return ResponseEntity.ok(eventService.getFilteredEvents(request));
    }

    @GetMapping("/filters")
    public ResponseEntity<EventFilterOptionsDTO> getFilterOptions() {
        return ResponseEntity.ok(eventService.getFilterOptions());
    }

    @PostMapping("/book/{eventId}")
    public ResponseEntity<?> bookTicketsForEvent(@AuthenticationPrincipal UserAccountDetails userDetails, @PathVariable int eventId, @RequestBody BookTicketsRequest request) {
        BookResponse response = new BookResponse();
        response.setResult(true);

        int orderId = this.ticketService.bookTickets(eventId, request.getNoTickets(), userDetails.getId());
        response.setOrderId(orderId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/book/confirm/{orderId}")
    public ResponseEntity<Response> confirmPaymentForTickets(@PathVariable int orderId, @RequestBody ConfirmationRequest request) {
        if (request.isSuccess()){
            this.ticketService.confirmPayment(orderId);
        }
        else {
            this.ticketService.cancelOrder(orderId);
        }

        return ResponseEntity.ok(new Response(true));
    }

    @PostMapping("/book/summary")
    public ResponseEntity<BookingSummaryResponse> getPurchaseSummary(@RequestBody BookingSummaryRequest request) {
        BookingSummaryResponse response = new BookingSummaryResponse();
        response.setResult(true);

        float total = ticketService.calculateOrderSummary(request).floatValue();
        response.setTotal(total);

        return ResponseEntity.ok(response);
    }
}
