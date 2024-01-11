package uj.wmii.musicevents.controller.API;

import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.request.TicketFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.TicketDTO;
import uj.wmii.musicevents.service.TicketService;
import uj.wmii.musicevents.service.UserAccountDetails;

import java.util.List;

@RestController
@RequestMapping(value = "/tickets", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class TicketController {
    @Autowired
    private TicketService service;

    @RolesAllowed({"ROLE_USER"})
    @PostMapping("/list")
    public ResponseEntity<List<TicketDTO>> getUserTicketsList(@AuthenticationPrincipal UserAccountDetails userDetails, @RequestBody SearchRequest<TicketFilterRequest> request) {

        return ResponseEntity.ok(service.getFilteredTickets(request, userDetails.getId()));
    }
}
