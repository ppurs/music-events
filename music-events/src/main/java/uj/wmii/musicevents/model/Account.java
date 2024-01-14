package uj.wmii.musicevents.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Users")
public abstract class Account {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;

    protected String firstname;

    protected String lastname;

    protected String email;

    protected String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "User_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    Set<Role> roles = new HashSet<>();

    public abstract Profile getProfile();

    public abstract String getType();
}