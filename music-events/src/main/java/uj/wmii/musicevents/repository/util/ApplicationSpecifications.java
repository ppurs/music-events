package uj.wmii.musicevents.repository.util;

import org.springframework.data.jpa.domain.Specification;
import uj.wmii.musicevents.constants.ApplicationStatus;
import uj.wmii.musicevents.model.Application;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class ApplicationSpecifications {
    public static Specification<Application> hasDateGTorEqual(Date start) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.greaterThanOrEqualTo(root.get("offer").get("date"), start);
    }

    public static Specification<Application> hasDateLTorEqual(Date end) {
        end.setTime(end.getTime() + TimeUnit.HOURS.toMillis(23) + TimeUnit.MINUTES.toMillis(59));

        return (root, query, criteriaBuilder)->
                criteriaBuilder.lessThanOrEqualTo(root.get("offer").get("date"), end);
    }

    public static Specification<Application> hasStatus(List<ApplicationStatus> statuses) {
        return (root, query, criteriaBuilder)-> criteriaBuilder.in(root.get("status")).value(statuses);
    }

    public static Specification<Application> submittedBy(int userId) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Application> forOffer(int offerId) {
        return (root, query, criteriaBuilder)->
                criteriaBuilder.equal(root.get("offer").get("id"), offerId);
    }
}
