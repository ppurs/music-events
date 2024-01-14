package uj.wmii.musicevents.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ApplicationDTO {
    private int id;
    private OfferDTO offer;
    private String type;
    private String bandName;
    private String instrument;
    private String genre;
    private String status;
    private ContactDTO contact;

    @Data
    @AllArgsConstructor
    public static class ContactDTO {
        private String name;
        private String email;
    }
}
