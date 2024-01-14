package uj.wmii.musicevents.service.strategy.offer_search_strategy;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.constants.OfferSearchType;
import uj.wmii.musicevents.model.Offer;
import uj.wmii.musicevents.repository.util.OfferSpecifications;

import java.util.Arrays;
import java.util.Date;

@Component(OfferSearchType.ALL)
public class AllOffersSearchStrategy implements OfferSearchStrategy {
    public Specification<Offer> getSearchSpecification(SearchRequest<OfferFilterRequest> searchFilter) {
        Specification<Offer> spec = Specification.where(null);

        OfferFilterRequest filter = searchFilter.getFilter();

        if(filter == null) {
            filter = new OfferFilterRequest();
            filter.setStartDate(new Date());
        }

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
        else {
            spec = spec.and(OfferSpecifications.hasDateGTorEqual(new Date()));
        }

        if (filter.getEndDate() != null) {
            spec = spec.and(OfferSpecifications.hasDateLTorEqual(filter.getEndDate()));
        }

        return spec;
    }

    public Sort getDefaultSort() {
        return Sort.by(Sort.Direction.ASC, "date");
    }
}
