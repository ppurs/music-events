package uj.wmii.musicevents.service;

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
import uj.wmii.musicevents.repository.OfferRepository;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;
import uj.wmii.musicevents.service.strategy.offer_search_strategy.OfferSearchStrategy;
import uj.wmii.musicevents.service.strategy.offer_search_strategy.OfferSearchStrategyFactory;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {
    @Autowired
    private OfferRepository repository;
    @Autowired
    private OfferSearchStrategyFactory strategyFactory;
    @Autowired
    private OfferMapper mapper;

    public List<OfferDTO> getFilteredOffers(String strategy, SearchRequest<OfferFilterRequest> searchFilter) {
        OfferSearchStrategy searchStrategy = this.strategyFactory.getSearchStrategy(strategy);
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), searchStrategy.getDefaultSort());

        return repository
                .findAll(searchStrategy.getSearchSpecification((searchFilter)), page)
                .map(mapper::mapToDTO)
                .getContent();
    }

    public OfferFilterOptionsDTO getFilterOptions() {
        return new OfferFilterOptionsDTO()
                .setCities(repository.findCities())
                .setTypes(repository.findTypes())
                .setGenres(repository.findGenres());
    }

    @Transactional
    public void deleteOffer(int offerId) {
        repository.deleteByOfferId(offerId);
    }
}
