package uj.wmii.musicevents.controller.API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uj.wmii.musicevents.controller.response.AddResponse;
import uj.wmii.musicevents.dto.ProfileDTO;
import uj.wmii.musicevents.model.MusicProfile;
import uj.wmii.musicevents.service.MusicProfileService;
import uj.wmii.musicevents.service.UserAccountDetails;
import uj.wmii.musicevents.service.UserAccountDetailsService;


@RestController
@RequestMapping(value = "/profile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins="*")
public class ProfileController {
    @Autowired
    private UserAccountDetailsService userService;

    @Autowired
    MusicProfileService mProfileService;


    @GetMapping("/details")
    public ResponseEntity<ProfileDTO> getProfileDetails(@AuthenticationPrincipal UserAccountDetails userDetails) {
        return ResponseEntity.ok(userService.getProfileDetails(userDetails.getId()));
    }

    @PostMapping("/music-profile/add")
    public ResponseEntity<AddResponse> addMusicProfile(@AuthenticationPrincipal UserAccountDetails userDetails, @RequestBody MusicProfile profile) {
        AddResponse response = new AddResponse();
        response.setResult(true);
        response.setInsertedId(userService.addMusicProfile(userDetails.getId(), profile));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/music-profile/delete/{profileId}")
    public void deleteMusicProfile(@PathVariable int profileId) {
        mProfileService.deleteMusicProfile(profileId);
    }
}
