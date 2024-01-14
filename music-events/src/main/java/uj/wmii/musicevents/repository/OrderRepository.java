package uj.wmii.musicevents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uj.wmii.musicevents.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order getReferenceById(Integer id);
}
