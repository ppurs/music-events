package uj.wmii.musicevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.controller.request.EventFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.EventDTO;
import uj.wmii.musicevents.dto.EventFilterOptionsDTO;
import uj.wmii.musicevents.dto.mapper.EventMapper;
import uj.wmii.musicevents.model.Event;
import uj.wmii.musicevents.repository.EventRepository;
import uj.wmii.musicevents.repository.util.EventSpecifications;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepository repository;
    @Autowired
    private EventMapper mapper;


    public List<EventDTO> getFilteredEvents(SearchRequest<EventFilterRequest> searchFilter) {
        Specification<Event> spec = Specification.where(null);
        Sort sort = Sort.by(Sort.Direction.ASC, "date");
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), sort);

        EventFilterRequest filter = searchFilter.getFilter();

        if(filter != null) {
            if (filter.getCities() != null && filter.getCities().length > 0) {
                spec = spec.and(EventSpecifications.takePlaceInCities(Arrays.stream(filter.getCities()).toList()));
            }

            if (filter.getTypes() != null && filter.getTypes().length > 0) {
                spec = spec.and(EventSpecifications.isOfTypes(Arrays.stream(filter.getTypes()).toList()));
            }

            if (filter.getGenres() != null && filter.getGenres().length > 0) {
                spec = spec.and(EventSpecifications.isOfGenreTypes(Arrays.stream(filter.getGenres()).toList()));
            }

            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

            if (filter.getStartDate() != null) {
                try {
                    spec = spec.and(EventSpecifications.hasDateGTorEqual(dateFormat.parse(filter.getStartDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }
            else {
                spec = spec.and(EventSpecifications.hasDateGTorEqual(new Date()));
            }

            if (filter.getEndDate() != null) {
                try {
                    spec = spec.and(EventSpecifications.hasDateLTorEqual(dateFormat.parse(filter.getEndDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }

            if (filter.getSearch() != null && !filter.getSearch().isEmpty()) {
                spec = spec.and(EventSpecifications.findByPhrase(filter.getSearch()));
            }
        }

        return repository.findAll(spec, page)
                .map(mapper::mapToDTO)
                .getContent();
    }

    public EventFilterOptionsDTO getFilterOptions() {
        return new EventFilterOptionsDTO()
                .setCities(repository.findCities())
                .setTypes(repository.findTypes())
                .setGenres(repository.findGenres());
    }
}
