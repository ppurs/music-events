package uj.wmii.musicevents.dto.mapper;

import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.TicketDTO;
import uj.wmii.musicevents.model.Ticket;

@Component
public class TicketMapper {
    public TicketDTO mapToDTO(Ticket ticket) {
        return new TicketDTO()
                .setId(ticket.getId())
                .setEvent(new EventMapper().mapToDTO(ticket.getEvent())
                        .setPrice(ticket.getPrice())
                );
    }
}
