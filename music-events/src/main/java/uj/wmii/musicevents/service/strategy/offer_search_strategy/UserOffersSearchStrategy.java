package uj.wmii.musicevents.service.strategy.offer_search_strategy;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.constants.OfferSearchType;
import uj.wmii.musicevents.model.Offer;
import uj.wmii.musicevents.repository.util.OfferSpecifications;
import uj.wmii.musicevents.service.UserAccountDetails;

import java.util.Arrays;

@Component(OfferSearchType.USER)
public class UserOffersSearchStrategy implements OfferSearchStrategy {
    public Specification<Offer> getSearchSpecification(SearchRequest<OfferFilterRequest> searchFilter) {
        Specification<Offer> spec = Specification.where(null);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        int userId = ((UserAccountDetails)authentication.getPrincipal()).getId();

        spec = spec.and(OfferSpecifications.organizedBy(userId));

        OfferFilterRequest filter = searchFilter.getFilter();

        if(filter != null) {
            if (filter.getCities() != null && filter.getCities().length > 0) {
                spec = spec.and(OfferSpecifications.takePlaceInCities(Arrays.stream(filter.getCities()).toList()));
            }

            if (filter.getTypes() != null && filter.getTypes().length > 0) {
                spec = spec.and(OfferSpecifications.isOfTypes(Arrays.stream(filter.getTypes()).toList()));
            }

            if (filter.getGenres() != null && filter.getGenres().length > 0) {
                spec = spec.and(OfferSpecifications.isOfGenreTypes(Arrays.stream(filter.getGenres()).toList()));
            }

            if (filter.getStartDate() != null) {
                spec = spec.and(OfferSpecifications.hasDateGTorEqual(filter.getStartDate()));
            }

            if (filter.getEndDate() != null) {
                spec = spec.and(OfferSpecifications.hasDateLTorEqual(filter.getEndDate()));
            }
        }

        return spec;
    }
    
    public Sort getDefaultSort() {
        return Sort.by(Sort.Direction.DESC, "date");
    }
}
