package uj.wmii.musicevents.controller.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.request.ApplicationFilterRequest;
import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.controller.response.AddResponse;
import uj.wmii.musicevents.controller.response.Response;
import uj.wmii.musicevents.dto.ApplicationDTO;
import uj.wmii.musicevents.dto.MusicProfileDTO;
import uj.wmii.musicevents.dto.OfferDTO;
import uj.wmii.musicevents.dto.OfferFilterOptionsDTO;
import uj.wmii.musicevents.model.Application;
import uj.wmii.musicevents.model.Offer;
import uj.wmii.musicevents.service.ApplicationService;
import uj.wmii.musicevents.service.MusicProfileService;
import uj.wmii.musicevents.service.OfferService;
import uj.wmii.musicevents.service.UserAccountDetails;

import java.util.List;

@RestController
@RequestMapping(value = "/offers", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class OfferController {
    @Autowired
    private OfferService offerService;
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    MusicProfileService mProfileService;

    @PostMapping(value = {"/list/{strategy:all|user}"})
    public ResponseEntity<List<OfferDTO>> getOffersList(@PathVariable String strategy, @RequestBody SearchRequest<OfferFilterRequest> request) {
        return ResponseEntity.ok(offerService.getFilteredOffers(strategy, request));
    }

    @GetMapping("/filters")
    public ResponseEntity<OfferFilterOptionsDTO> getFilterOptions() {
        return ResponseEntity.ok(offerService.getOfferFilterOptions());
    }

    @DeleteMapping("/delete/{offerId}")
    public void deleteOffer(@PathVariable int offerId) {
        offerService.deleteOffer(offerId);
    }

    @PostMapping("/add")
    public ResponseEntity<AddResponse> addOffer(@AuthenticationPrincipal UserAccountDetails userDetails, @RequestBody Offer offer) {
        AddResponse response = new AddResponse();
        response.setResult(true);
        response.setInsertedId(offerService.addOffer(offer, userDetails.getId()));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/apply/{offerId}")
    public void applyForOffer(@AuthenticationPrincipal UserAccountDetails userDetails, @PathVariable int offerId, @RequestBody Application request) {
        offerService.applyForOffer(request, offerId, userDetails.getId());
    }

    @PostMapping("/my/{offerId}/applications")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForOffer(@PathVariable int offerId, @RequestBody SearchRequest<ApplicationFilterRequest> request) {
        return ResponseEntity.ok(applicationService.getApplicationsForOffer(request, offerId));
    }

    @GetMapping("/my/applications/{applicationId}/accept")
    public ResponseEntity<Response> acceptApplication(@PathVariable int applicationId) {
        applicationService.acceptApplication(applicationId);

        return ResponseEntity.ok(new Response(true));
    }

    @GetMapping("/my/applications/{applicationId}/reject")
    public ResponseEntity<Response> rejectApplication(@PathVariable int applicationId) {
        applicationService.rejectApplication(applicationId);

        return ResponseEntity.ok(new Response(true));
    }

    @GetMapping("music-profile-list")
    public ResponseEntity<List<MusicProfileDTO>> geMusicProfiles(@AuthenticationPrincipal UserAccountDetails userDetails) {
        return ResponseEntity.ok(mProfileService.getUserMusicProfiles(userDetails.getId()));
    }
}
