package uj.wmii.musicevents.service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.controller.request.BookingSummaryRequest;
import uj.wmii.musicevents.controller.request.TicketFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.TicketDTO;
import uj.wmii.musicevents.dto.mapper.TicketMapper;
import uj.wmii.musicevents.constants.OrderStatus;
import uj.wmii.musicevents.model.Event;
import uj.wmii.musicevents.model.Order;
import uj.wmii.musicevents.model.Ticket;
import uj.wmii.musicevents.model.UserAccount;
import uj.wmii.musicevents.repository.EventRepository;
import uj.wmii.musicevents.repository.OrderRepository;
import uj.wmii.musicevents.repository.TicketRepository;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;
import uj.wmii.musicevents.repository.util.TicketSpecifications;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private TicketMapper mapper;

    public List<TicketDTO> getFilteredTickets(SearchRequest<TicketFilterRequest> searchFilter, int userId) {
        Sort sort = Sort
                .by(searchFilter.getListOrder().getOrder(), searchFilter.getListOrder().getField());
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), sort);

        Specification<Ticket> spec = Specification.where(TicketSpecifications.orderedBy(userId));
        TicketFilterRequest filter = searchFilter.getFilter();

        if(filter == null) {
            filter = new TicketFilterRequest();
            filter.setStartDate(new Date());
        }

        if (filter.getStartDate() != null) {
            spec = spec.and(TicketSpecifications.hasEventDateGTorEqual(filter.getStartDate()));
        }
        else {
            spec = spec.and(TicketSpecifications.hasEventDateGTorEqual(new Date()));
        }

        if (filter.getEndDate() != null) {
            spec = spec.and(TicketSpecifications.hasEventDateLTorEqual(filter.getEndDate()));
        }

        return ticketRepository
                .findAll(spec, page)
                .map(mapper::mapToDTO)
                .getContent();
    }

    @Transactional
    public int bookTickets(int eventId, int noTickets, int userId) {
        Event event = eventRepository.findById(eventId).get();

        Order newOrder = new Order();
        newOrder.setCreationDate(new Date());
        newOrder.setUser(entityManager.getReference(UserAccount.class, userId));
        newOrder.setStatus(OrderStatus.CREATED);
        Order insertedOrder = orderRepository.save(newOrder);

        List<Ticket> tickets = generateTickets(eventId, noTickets, userId, insertedOrder);
        insertedOrder.setTickets(tickets);

        if(insertedOrder.calculateTotal().compareTo(BigDecimal.ZERO) == 0) {
            confirmPayment(insertedOrder.getId());
        }

        event.reduceAvailableTickets(noTickets);
        eventRepository.save(event);

        return insertedOrder.getId();
    }

    @Transactional
    public void confirmPayment(int orderId) {
        Order orderToUpdate = orderRepository.getReferenceById(orderId);
        orderToUpdate.setStatus(OrderStatus.PAID);
        orderRepository.save(orderToUpdate);
    }

    @Transactional
    public void cancelOrder(int orderId) {
        Order orderToUpdate = orderRepository.getReferenceById(orderId);
        orderToUpdate.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(orderToUpdate);

        List<Ticket> tickets = ticketRepository.findAllByOrder_Id(orderId);
        Event event = tickets.get(0).getEvent();
        event.increaseAvailableTickets(tickets.size());

        this.eventRepository.save(event);
    }

    @Transactional
    public int findNoAvailableTickets(int eventId) {
        List<Ticket> tickets = ticketRepository.findAllByEvent_Id(eventId);
        AtomicInteger noTickets = new AtomicInteger();

        tickets.forEach(ticket -> {
            long millsForPayment = ticket.getOrder().getCreationDate().getTime() + TimeUnit.MINUTES.toMillis(15);
            boolean ticketReservationExpired = (ticket.getOrder().getStatus() == OrderStatus.CREATED)
                            && (System.currentTimeMillis() > millsForPayment);
            if (ticketReservationExpired) {
                cancelOrder(ticket.getOrder().getId());
                noTickets.addAndGet(1);
            }
        });

        return noTickets.get();
    }

    public boolean checkAllTicketsSold(int eventId) {
        List<Ticket> tickets = ticketRepository.findAllByEvent_IdAndOrder_Status(eventId, OrderStatus.CREATED);

        return tickets.size() == 0;
    }

    public BigDecimal calculateOrderSummary(BookingSummaryRequest request) {
        Event event = eventRepository.findById(request.getEventId()).get();
        Ticket newTicket = new Ticket();
        newTicket.setPrice(event.getPrice());

        List<Ticket> tickets = new ArrayList<>();
        for(int i = 0; i < request.getNoTickets(); i++) {
            tickets.add(new Ticket(newTicket));
        }

        Order order = new Order();
        order.setTickets(tickets);

        return order.calculateTotal();
    }

    private List<Ticket> generateTickets(int eventId, int noTickets, int userId, Order order) {
        Event event = eventRepository.findById(eventId).get();

        Ticket newTicket = new Ticket();
        newTicket.setEvent(event);
        newTicket.setUserId(userId);
        newTicket.setPrice(event.getPrice());
        newTicket.setOrder(order);

        List<Ticket> tickets = new ArrayList<>();
        for(int i = 0; i < noTickets; i++) {
            tickets.add(new Ticket(newTicket));
        }

        ticketRepository.saveAll(tickets);
        return tickets;
    }
}
