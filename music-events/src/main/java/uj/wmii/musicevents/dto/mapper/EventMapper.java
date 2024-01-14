package uj.wmii.musicevents.dto.mapper;

import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.EventDTO;
import uj.wmii.musicevents.enums.TicketsStatus;
import uj.wmii.musicevents.model.Event;

@Component
public class EventMapper {
    public EventDTO mapToDTO(Event event) {
        String[] performers = null;
        if(event.getPerformers() != null) {
            performers = event.getPerformers().split(", ");
        }

        boolean availableTickets = (event.getTicketsStatus() == TicketsStatus.AVAILABLE) && (event.getNoAvailableTickets() > 0);

        return new EventDTO()
                .setId(event.getId())
                .setTitle(event.getTitle())
                .setDescription(event.getDescription())
                .setPerformers(performers)
                .setCity(event.getCity())
                .setLocation(event.getLocation())
                .setDate(event.getDate().toString())
                .setType(event.getType())
                .setGenre(event.getGenre())
                .setPrice(event.getPrice())
                .setTicketsAvailable(availableTickets);
    }
}
