package uj.wmii.musicevents.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.dto.MusicProfileDTO;
import uj.wmii.musicevents.dto.mapper.MusicProfileMapper;
import uj.wmii.musicevents.model.MusicProfile;
import uj.wmii.musicevents.repository.MusicProfileRepository;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class MusicProfileServiceImpl implements MusicProfileService {
    @Autowired
    MusicProfileRepository repository;

    @Autowired
    MusicProfileMapper mapper;

    @Transactional
    public void deleteMusicProfile(int id) {
        this.repository.deleteByProfileId(id);
    }

    public int addMusicProfile(MusicProfile profile) {
        return repository.save(profile).getId();
    }

    public List<MusicProfileDTO> getUserMusicProfiles(int userId) {
        return StreamSupport.stream(repository.findAllByUser_Id(userId).spliterator(), false)
                .map(mapper::mapToDTO)
                .toList();
    }
}
