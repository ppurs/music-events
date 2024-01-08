package uj.wmii.musicevents.repository.util;

import org.springframework.data.jpa.domain.Specification;
import uj.wmii.musicevents.model.Offer;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class OfferSpecifications {
    public static Specification<Offer> takePlaceInCities(List<String> cities) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.in(root.get("city")).value(cities);
    }

    public static Specification<Offer> isOfTypes(List<String> types) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.in(root.get("type")).value(types);
    }

    public static Specification<Offer> isOfGenreTypes(List<String> genres) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.in(root.get("genre")).value(genres);
    }

    public static Specification<Offer> hasDateGTorEqual(Date start) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.greaterThanOrEqualTo(root.get("date"), start);
    }

    public static Specification<Offer> hasDateLTorEqual(Date end) {
        end.setTime(end.getTime() + TimeUnit.HOURS.toMillis(23) + TimeUnit.MINUTES.toMillis(59));

        return (root, query, criteriaBuilder)->
                criteriaBuilder.lessThanOrEqualTo(root.get("date"), end);
    }

    public static Specification<Offer> organizedBy(int userId) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.equal(root.get("organizer").get("id"), userId);
    }
}
