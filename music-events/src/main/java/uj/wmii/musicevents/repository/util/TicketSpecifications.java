package uj.wmii.musicevents.repository.util;

import org.springframework.data.jpa.domain.Specification;
import uj.wmii.musicevents.model.Ticket;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class TicketSpecifications {
    public static Specification<Ticket> hasEventDateGTorEqual(Date start) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.greaterThanOrEqualTo(root.get("event").get("date"), start);
    }

    public static Specification<Ticket> hasEventDateLTorEqual(Date end) {
        end.setTime(end.getTime() + TimeUnit.HOURS.toMillis(23) + TimeUnit.MINUTES.toMillis(59));

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("event").get("date"), end);
    }

    public static Specification<Ticket> orderedBy(int userId) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.equal(root.get("userId"), userId);
    }
}
