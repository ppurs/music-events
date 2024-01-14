package uj.wmii.musicevents.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import uj.wmii.musicevents.enums.ApplicationStatus;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Applications")
public class Application {
    @Id
    @Column(name="application_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserAccount user;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "offer_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Offer offer;

    @Column(nullable = false)
    private String type;

    @Column(name = "band_name")
    private String bandName;

    private String instrument;

    private String genre;

    @Column(name = "submit_date")
    private Date submitDate;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;
}
