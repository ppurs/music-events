package uj.wmii.musicevents.service.strategy.offer_search_strategy;

import org.springframework.data.jpa.domain.Specification;
import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.model.Offer;

public interface OfferSearchStrategy {
    Specification<Offer> getSearchSpecification(SearchRequest<OfferFilterRequest> searchFilter);
}
