package uj.wmii.musicevents.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Offers")
public class Offer {
    @Id
    @Column(name="offer_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String city;

    private String location;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private String type;

    private String genre;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "organizer_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private OrganizerAccount organizer;
}
