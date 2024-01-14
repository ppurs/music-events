package uj.wmii.musicevents.controller.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.request.ApplicationFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.ApplicationDTO;
import uj.wmii.musicevents.dto.ApplicationFilterOptionsDTO;
import uj.wmii.musicevents.service.ApplicationService;
import uj.wmii.musicevents.service.OfferService;
import uj.wmii.musicevents.service.UserAccountDetails;

import java.util.List;

@RestController
@RequestMapping(value = "/applications", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class ApplicationController {
    @Autowired
    private OfferService offerService;

    @Autowired
    private ApplicationService applicationService;


    @PostMapping("/list")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsList(@AuthenticationPrincipal UserAccountDetails userDetails, @RequestBody SearchRequest<ApplicationFilterRequest> request) {

        return ResponseEntity.ok(applicationService.getUserApplications(request, userDetails.getId()));
    }

    @GetMapping("/filters")
    public ResponseEntity<ApplicationFilterOptionsDTO> getFilterOptions() {
        return ResponseEntity.ok(new ApplicationFilterOptionsDTO(applicationService.getApplicationsStatuses()));
    }
}
