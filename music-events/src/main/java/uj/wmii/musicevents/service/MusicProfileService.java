package uj.wmii.musicevents.service;

import uj.wmii.musicevents.dto.MusicProfileDTO;
import uj.wmii.musicevents.model.MusicProfile;

import java.util.List;

public interface MusicProfileService {
    void deleteMusicProfile(int id);
    int addMusicProfile(MusicProfile profile);
    List<MusicProfileDTO> getUserMusicProfiles(int userId);
}
