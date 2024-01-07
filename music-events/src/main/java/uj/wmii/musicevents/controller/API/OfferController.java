package uj.wmii.musicevents.controller.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.OfferDTO;
import uj.wmii.musicevents.dto.OfferFilterOptionsDTO;
import uj.wmii.musicevents.service.OfferService;

import java.util.List;

@RestController
@RequestMapping(value = "/offers", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class OfferController {
    @Autowired
    private OfferService service;

    @PostMapping("/list")
    public ResponseEntity<List<OfferDTO>> getEventsList(@RequestBody SearchRequest<OfferFilterRequest> request) {
        return ResponseEntity.ok(service.getFilteredOffers(request));
    }

    @GetMapping("/filters")
    public ResponseEntity<OfferFilterOptionsDTO> getFilterOptions() {
        return ResponseEntity.ok(service.getFilterOptions());
    }
}
