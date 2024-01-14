package uj.wmii.musicevents.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import uj.wmii.musicevents.constants.OrderStatus;
import uj.wmii.musicevents.model.Ticket;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer>, JpaSpecificationExecutor<Ticket> {
    Page<Ticket> findAll(Specification<Ticket> spec, Pageable pageable);
    List<Ticket> findAllByOrder_Id(Integer id);
    List<Ticket> findAllByEvent_Id(Integer id);
    List<Ticket> findAllByEvent_IdAndOrder_Status(Integer eventId, OrderStatus status);
}
