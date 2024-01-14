package uj.wmii.musicevents.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import uj.wmii.musicevents.model.Event;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer>, JpaSpecificationExecutor<Event> {
    Page<Event> findAll(Specification<Event> spec, Pageable pageable);
    Optional<Event> findById(Integer id);

    @Query("SELECT DISTINCT e.city FROM Event e")
    List<String> findCities();

    @Query("SELECT DISTINCT e.type FROM Event e")
    List<String> findTypes();

    @Query("SELECT DISTINCT e.genre FROM Event e WHERE e.genre IS NOT NULL")
    List<String> findGenres();
}
