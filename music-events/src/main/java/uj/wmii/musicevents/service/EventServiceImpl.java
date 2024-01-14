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
import uj.wmii.musicevents.constants.TicketsStatus;
import uj.wmii.musicevents.model.Event;
import uj.wmii.musicevents.repository.EventRepository;
import uj.wmii.musicevents.repository.util.EventSpecifications;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepository repository;
    @Autowired
    private EventMapper mapper;
    @Autowired
    private TicketService ticketService;

    public List<EventDTO> getFilteredEvents(SearchRequest<EventFilterRequest> searchFilter) {
        Specification<Event> spec = Specification.where(null);
        Sort sort = Sort.by(Sort.Direction.ASC, "date");
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), sort);

        EventFilterRequest filter = searchFilter.getFilter();

        if(filter == null) {
            filter = new EventFilterRequest();
            filter.setStartDate(new Date());
        }

        if (filter.getCities() != null && filter.getCities().length > 0) {
            spec = spec.and(EventSpecifications.takePlaceInCities(Arrays.stream(filter.getCities()).toList()));
        }

        if (filter.getTypes() != null && filter.getTypes().length > 0) {
            spec = spec.and(EventSpecifications.isOfTypes(Arrays.stream(filter.getTypes()).toList()));
        }

        if (filter.getGenres() != null && filter.getGenres().length > 0) {
            spec = spec.and(EventSpecifications.isOfGenreTypes(Arrays.stream(filter.getGenres()).toList()));
        }

        if (filter.getStartDate() != null) {
            spec = spec.and(EventSpecifications.hasDateGTorEqual(filter.getStartDate()));
        }
        else {
            spec = spec.and(EventSpecifications.hasDateGTorEqual(new Date()));
        }

        if (filter.getEndDate() != null) {
            spec = spec.and(EventSpecifications.hasDateLTorEqual(filter.getEndDate()));
        }

        if (filter.getSearch() != null && !filter.getSearch().isEmpty()) {
            spec = spec.and(EventSpecifications.findByPhrase(filter.getSearch()));
        }

        List<Event> events = repository.findAll(spec, page).getContent();

        events.forEach(this::checkTicketsAvailability);

        return events.stream()
                .map(mapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public EventFilterOptionsDTO getFilterOptions() {
        return new EventFilterOptionsDTO()
                .setCities(repository.findCities())
                .setTypes(repository.findTypes())
                .setGenres(repository.findGenres());
    }

    private void checkTicketsAvailability(Event event) {
        if(event.getTicketsStatus() == TicketsStatus.NOT_AVAILABLE) {
            return;
        }

        if(event.getNoAvailableTickets() > 0) {
            return;
        }

        if(ticketService.checkAllTicketsSold(event.getId())) {
            event.setTicketsStatus(TicketsStatus.NOT_AVAILABLE);
        }
        else {
            int availableTickets = ticketService.findNoAvailableTickets(event.getId());

            if(availableTickets > 0) {
                event.setNoAvailableTickets(availableTickets);
            }
        }

        repository.save(event);
    }
}
