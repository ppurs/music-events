package uj.wmii.musicevents.dto.mapper;

import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.OfferDTO;
import uj.wmii.musicevents.model.Offer;

@Component
public class OfferMapper {
    public OfferDTO mapToDTO(Offer offer) {
        return new OfferDTO()
                .setId(offer.getId())
                .setTitle(offer.getTitle())
                .setDescription(offer.getDescription())
                .setCity(offer.getCity())
                .setLocation(offer.getLocation())
                .setDate(offer.getDate().toString())
                .setType(offer.getType())
                .setGenre(offer.getGenre())
                .setOrganizer(offer.getOrganizer().getOrganizationName());
    }
}
