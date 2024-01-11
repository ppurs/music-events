package uj.wmii.musicevents.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.model.MusicProfile;
import uj.wmii.musicevents.repository.MusicProfileRepository;

@Service
public class MusicProfileServiceImpl implements MusicProfileService {
    @Autowired
    MusicProfileRepository repository;

    @Transactional
    public void deleteMusicProfile(int id) {
        this.repository.deleteByProfileId(id);
    }

    public int addMusicProfile(MusicProfile profile) {
        return repository.save(profile).getId();
    }
}
