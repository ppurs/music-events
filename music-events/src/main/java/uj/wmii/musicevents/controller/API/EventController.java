package uj.wmii.musicevents.controller.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.request.EventSearchRequest;
import uj.wmii.musicevents.dto.EventDTO;
import uj.wmii.musicevents.dto.EventFilterOptionsDTO;
import uj.wmii.musicevents.service.EventService;

import java.util.List;

@RestController
@RequestMapping(value = "/events", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class EventController {
    @Autowired
    private EventService service;

    @PostMapping("/list")
    public ResponseEntity<List<EventDTO>> getEventsList(@RequestBody EventSearchRequest request) {
        return ResponseEntity.ok(service.getFilteredEvents(request));
    }

    @GetMapping("/filters")
    public ResponseEntity<EventFilterOptionsDTO> getFilterOptions() {
        return ResponseEntity.ok(service.getFilterOptions());
    }
}
