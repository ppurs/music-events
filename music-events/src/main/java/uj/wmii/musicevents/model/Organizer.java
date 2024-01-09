package uj.wmii.musicevents.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@Entity
@DiscriminatorValue("ORGANIZER")
@EqualsAndHashCode(callSuper = true)
@Data
public class Organizer extends UserAccount {
    @Column(name = "organization_name")
    private String organizationName;

    public Organizer(int id, String first, String last, String email, String password, Set<Role> roles, String name) {
        super(id, first, last, email, password, roles);
        this.organizationName = name;
    }

    public Organizer(int id, String first, String last, String email, String password, Set<Role> roles) {
        super(id, first, last, email, password, roles);
        this.organizationName = null;
    }

    public Organizer() {
        super();
        this.organizationName = null;
    }
}
