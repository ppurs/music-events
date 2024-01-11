package uj.wmii.musicevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.controller.request.TicketFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.TicketDTO;
import uj.wmii.musicevents.dto.mapper.TicketMapper;
import uj.wmii.musicevents.model.Ticket;
import uj.wmii.musicevents.repository.TicketRepository;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;
import uj.wmii.musicevents.repository.util.TicketSpecifications;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository repository;
    @Autowired
    private TicketMapper mapper;

    public List<TicketDTO> getFilteredTickets(SearchRequest<TicketFilterRequest> searchFilter, int userId) {
        Sort sort = Sort
                .by(searchFilter.getListOrder().getOrder(), searchFilter.getListOrder().getField());
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), sort);

        Specification<Ticket> spec = Specification.where(TicketSpecifications.orderedBy(userId));
        TicketFilterRequest filter = searchFilter.getFilter();

        if(filter != null) {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

            if (filter.getStartDate() != null) {
                try {
                    spec = spec.and(TicketSpecifications.hasEventDateLTorEqual(dateFormat.parse(filter.getStartDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }
            else {
                spec = spec.and(TicketSpecifications.hasEventDateGTorEqual(new Date()));
            }

            if (filter.getEndDate() != null) {
                try {
                    spec = spec.and(TicketSpecifications.hasEventDateLTorEqual(dateFormat.parse(filter.getEndDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }
        }

        return repository
                .findAll(spec, page)
                .map(mapper::mapToDTO)
                .getContent();
    }
}
