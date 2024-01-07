package uj.wmii.musicevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.controller.request.OfferFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.OfferDTO;
import uj.wmii.musicevents.dto.OfferFilterOptionsDTO;
import uj.wmii.musicevents.dto.mapper.OfferMapper;
import uj.wmii.musicevents.model.Offer;
import uj.wmii.musicevents.repository.OfferRepository;
import uj.wmii.musicevents.repository.util.OfferSpecifications;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class OfferService {
    @Autowired
    private OfferRepository repository;

    public List<OfferDTO> getFilteredOffers(SearchRequest<OfferFilterRequest> searchFilter) {
        Specification<Offer> spec = Specification.where(null);
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset());

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

            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

            if (filter.getStartDate() != null) {
                try {
                    spec = spec.and(OfferSpecifications.hasDateGTorEqual(dateFormat.parse(filter.getStartDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }
            else {
                spec = spec.and(OfferSpecifications.hasDateGTorEqual(new Date()));
            }

            if (filter.getEndDate() != null) {
                try {
                    spec = spec.and(OfferSpecifications.hasDateLTorEqual(dateFormat.parse(filter.getEndDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }
        }

        return repository.findAll(spec, page)
                .map(offer -> new OfferMapper().mapToDTO(offer)).getContent();
    }

    public OfferFilterOptionsDTO getFilterOptions() {
        return new OfferFilterOptionsDTO()
                .setCities(repository.findCities())
                .setTypes(repository.findTypes())
                .setGenres(repository.findGenres());
    }
}
