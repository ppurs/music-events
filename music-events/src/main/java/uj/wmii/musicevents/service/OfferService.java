package uj.wmii.musicevents.service;

import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.OfferDTO;
import uj.wmii.musicevents.dto.OfferFilterOptionsDTO;
import uj.wmii.musicevents.model.Application;
import uj.wmii.musicevents.model.Offer;

import java.util.List;

public interface OfferService {
    List<OfferDTO> getFilteredOffers(String strategy, SearchRequest<OfferFilterRequest> searchFilter);
    OfferFilterOptionsDTO getOfferFilterOptions();
    void deleteOffer(int offerId);
    int addOffer(Offer offer, int userId);
    void applyForOffer(Application application, int offerId, int userId);
}
