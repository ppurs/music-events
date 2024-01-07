package uj.wmii.musicevents.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@DiscriminatorValue("ORGANIZER")
@EqualsAndHashCode(callSuper = true)
@Data
public class Organizer extends UserInfo {
    @Column(name = "organization_name")
    private String organizationName;

    public Organizer(int id, String first, String last, String email, String password, String roles, String name) {
        super(id, first, last, email, password, roles);
        this.organizationName = name;
    }

    public Organizer(int id, String first, String last, String email, String password, String roles) {
        super(id, first, last, email, password, roles);
        this.organizationName = null;
    }

    public Organizer() {
        super();
        this.organizationName = null;
    }
}
