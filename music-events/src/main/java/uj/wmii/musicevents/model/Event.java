package uj.wmii.musicevents.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uj.wmii.musicevents.constants.TicketsStatus;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="Events")
public class Event {
    @Id
    @Column(name="event_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String title;

    private String description;

    private String performers;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private String type;

    private String genre;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "no_available_tickets", nullable = false)
    private int noAvailableTickets;

    @Enumerated(EnumType.STRING)
    @Column(name = "tickets_status", nullable = false)
    private TicketsStatus ticketsStatus;

    public void reduceAvailableTickets(int num) {
        this.noAvailableTickets -= num;
    }

    public void increaseAvailableTickets(int num) {
        this.noAvailableTickets += num;
    }
}
