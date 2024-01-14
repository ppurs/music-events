package uj.wmii.musicevents.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;
import uj.wmii.musicevents.enums.AccountType;

import java.util.List;
import java.util.Set;

@Entity
@DiscriminatorValue("USER")
@EqualsAndHashCode(callSuper = true)
@Data
public class UserAccount extends Account {
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    List<MusicProfile> musicProfiles;

    public UserAccount(int id, String first, String last, String email, String password, Set<Role> roles, List<MusicProfile> profiles) {
        super(id, first, last, email, password, roles);
        this.musicProfiles = profiles;
    }

    public UserAccount(int id, String first, String last, String email, String password, Set<Role> roles) {
        super(id, first, last, email, password, roles);
        this.musicProfiles = null;
    }

    public UserAccount() {
        super();
        this.musicProfiles = null;
    }

    @Override
    public Profile getProfile() {
        return new Profile()
                .setEmail(this.email)
                .setFirstName(this.firstname)
                .setLastName(this.lastname)
                .setMusicProfiles(this.musicProfiles);
    }

    @Override
    public String getType() {
        return AccountType.USER;
    }
}
