package uj.wmii.musicevents.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import uj.wmii.musicevents.model.Offer;

import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Integer>, JpaSpecificationExecutor<Offer> {
    Page<Offer> findAll(Specification<Offer> spec, Pageable pageable);

    @Query("SELECT DISTINCT o.city FROM Offer o")
    List<String> findCities();

    @Query("SELECT DISTINCT o.type FROM Offer o")
    List<String> findTypes();

    @Query("SELECT DISTINCT o.genre FROM Offer o WHERE o.genre IS NOT NULL")
    List<String> findGenres();
}
