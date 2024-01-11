package uj.wmii.musicevents.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uj.wmii.musicevents.model.MusicProfile;

@Repository
public interface MusicProfileRepository extends CrudRepository<MusicProfile, Integer> {
    @Modifying
    @Query("DELETE FROM MusicProfile m WHERE m.id = ?1")
    void deleteByProfileId(Integer id);
}
