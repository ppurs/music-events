package uj.wmii.musicevents.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import uj.wmii.musicevents.constants.AccountType;

@Entity
@DiscriminatorValue("ADMIN")
@EqualsAndHashCode(callSuper = true)
@Data
public class AdminAccount extends Account {

    @Override
    public Profile getProfile() {
        return new Profile()
                .setEmail(this.email)
                .setFirstName(this.firstname)
                .setLastName(this.lastname);
    }

    @Override
    public String getType() {
        return AccountType.ADMIN;
    }
}
