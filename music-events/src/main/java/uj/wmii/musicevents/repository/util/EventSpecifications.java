package uj.wmii.musicevents.repository.util;

import org.springframework.data.jpa.domain.Specification;
import uj.wmii.musicevents.model.Event;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class EventSpecifications {
    public static Specification<Event> takePlaceInCities(List<String> cities) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.in(root.get("city")).value(cities);
    }

    public static Specification<Event> isOfTypes(List<String> types) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.in(root.get("type")).value(types);
    }

    public static Specification<Event> isOfGenreTypes(List<String> genres) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.in(root.get("genre")).value(genres);
    }

    public static Specification<Event> hasDateGTorEqual(Date start) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.greaterThanOrEqualTo(root.get("date"), start);
    }

    public static Specification<Event> hasDateLTorEqual(Date end) {
        end.setTime(end.getTime() + TimeUnit.HOURS.toMillis(23) + TimeUnit.MINUTES.toMillis(59));

        return (root, query, criteriaBuilder)->
                criteriaBuilder.lessThanOrEqualTo(root.get("date"), end);
    }

    public static Specification<Event> findByPhrase(String search) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.or(
                        criteriaBuilder.like(root.get("title"), "%" + search + "%"),
                        criteriaBuilder.like(root.get("performers"), "%" + search + "%")
                );
    }
}
