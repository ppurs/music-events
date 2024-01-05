package uj.wmii.musicevents.dto.mapper;

import uj.wmii.musicevents.dto.EventDTO;
import uj.wmii.musicevents.model.Event;

public class EventMapper {
    public EventDTO mapToDTO(Event event) {
        String[] performers = null;
        if(event.getPerformers() != null) {
            performers = event.getPerformers().split(", ");
        }

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
                .setTicketsAvailable(event.getNoTickets() > 0);
    }
}
