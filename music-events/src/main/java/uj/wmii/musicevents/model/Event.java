package uj.wmii.musicevents.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(nullable = false)
    String title;

    String description;

    String performers;

    @Column(nullable = false)
    String city;

    @Column(nullable = false)
    String location;

    @Column(nullable = false)
    Date date;

    @Column(nullable = false)
    String type;

    String genre;

    @Column(nullable = false)
    BigDecimal price;

    @Column(nullable = false)
    int noTickets;
}
