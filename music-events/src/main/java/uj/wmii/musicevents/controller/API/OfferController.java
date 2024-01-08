package uj.wmii.musicevents.controller.API;

import jakarta.annotation.security.RolesAllowed;
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

    @PostMapping(value = {"/list/{strategy:all|user}"})
    public ResponseEntity<List<OfferDTO>> getOffersList(@PathVariable String strategy, @RequestBody SearchRequest<OfferFilterRequest> request) {
        return ResponseEntity.ok(service.getFilteredOffers(strategy, request));
    }

    @GetMapping("/filters")
    public ResponseEntity<OfferFilterOptionsDTO> getFilterOptions() {
        return ResponseEntity.ok(service.getFilterOptions());
    }

    @RolesAllowed({ "ROLE_ORGANIZER", "ROLE_ADMIN" })
    @DeleteMapping("/delete/{offerId}")
    public void deleteOffer(@PathVariable int offerId) {
        service.deleteOffer(offerId);
    }
}
