package uj.wmii.musicevents.dto.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uj.wmii.musicevents.dto.ApplicationDTO;
import uj.wmii.musicevents.enums.ApplicationStatus;
import uj.wmii.musicevents.model.Application;

@Component
public class ApplicationMapper {
    @Autowired
    OfferMapper offerMapper;

    public ApplicationDTO mapToDTOForOrganizer(Application application) {
        String userName = application.getUser().getFirstname() + " " + application.getUser().getLastname();
        ApplicationDTO.ContactDTO contact = new ApplicationDTO.ContactDTO(userName, application.getUser().getEmail());

        return new ApplicationDTO()
                .setId(application.getId())
                .setOffer(null)
                .setType(application.getType())
                .setGenre(application.getGenre())
                .setBandName(application.getBandName())
                .setInstrument(application.getInstrument())
                .setContact(contact)
                .setStatus(application.getStatus().name());
    }

    public ApplicationDTO mapToDTOForUser(Application application) {
        ApplicationDTO.ContactDTO contact = null;

        if(application.getStatus() == ApplicationStatus.ACCEPTED) {
            contact = new ApplicationDTO.ContactDTO(application.getOffer().getOrganizer().getOrganizationName(),
                    application.getOffer().getOrganizer().getEmail());
        }

        return new ApplicationDTO()
                .setId(application.getId())
                .setOffer(offerMapper.mapToDTO(application.getOffer()))
                .setType(application.getType())
                .setGenre(application.getGenre())
                .setBandName(application.getBandName())
                .setInstrument(application.getInstrument())
                .setContact(contact)
                .setStatus(application.getStatus().name());
    }
}
