package uj.wmii.musicevents.service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.OfferDTO;
import uj.wmii.musicevents.dto.OfferFilterOptionsDTO;
import uj.wmii.musicevents.dto.mapper.OfferMapper;
import uj.wmii.musicevents.enums.ApplicationStatus;
import uj.wmii.musicevents.model.Application;
import uj.wmii.musicevents.model.Offer;
import uj.wmii.musicevents.model.Organizer;
import uj.wmii.musicevents.model.UserAccount;
import uj.wmii.musicevents.repository.ApplicationRepository;
import uj.wmii.musicevents.repository.OfferRepository;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;
import uj.wmii.musicevents.service.strategy.offer_search_strategy.OfferSearchStrategy;
import uj.wmii.musicevents.service.strategy.offer_search_strategy.OfferSearchStrategyFactory;

import java.util.Date;
import java.util.List;


@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {
    @Autowired
    private OfferRepository offerRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private OfferSearchStrategyFactory strategyFactory;
    @Autowired
    private OfferMapper offerMapper;
    @Autowired
    private EntityManager entityManager;

    public List<OfferDTO> getFilteredOffers(String strategy, SearchRequest<OfferFilterRequest> searchFilter) {
        OfferSearchStrategy searchStrategy = this.strategyFactory.getSearchStrategy(strategy);
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), searchStrategy.getDefaultSort());

        return offerRepository.findAll(searchStrategy.getSearchSpecification((searchFilter)), page)
                .map(offerMapper::mapToDTO)
                .getContent();
    }

    public OfferFilterOptionsDTO getOfferFilterOptions() {
        return new OfferFilterOptionsDTO()
                .setCities(offerRepository.findCities())
                .setTypes(offerRepository.findTypes())
                .setGenres(offerRepository.findGenres());
    }

    @Transactional
    public void deleteOffer(int offerId) {
        offerRepository.deleteByOfferId(offerId);
    }

    public int addOffer(Offer offer, int userId) {
        offer.setOrganizer(entityManager.getReference(Organizer.class, userId));
        System.out.println(offer);

        return offerRepository.save(offer).getId();
    }

    public void applyForOffer(Application application, int offerId, int userId) {
        application.setOffer(entityManager.getReference(Offer.class, offerId));
        application.setUser(entityManager.getReference(UserAccount.class, userId));
        application.setStatus(ApplicationStatus.SUBMITTED);
        application.setSubmitDate(new Date());

        applicationRepository.save(application);
    }
}
