package uj.wmii.musicevents.service;

import uj.wmii.musicevents.model.MusicProfile;

public interface MusicProfileService {
    void deleteMusicProfile(int id);
    int addMusicProfile(MusicProfile profile);
}
