package uj.wmii.musicevents.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import uj.wmii.musicevents.model.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Integer>, JpaSpecificationExecutor<Application> {
    Page<Application> findAll(Specification<Application> spec, Pageable pageable);
    Application getReferenceById(Integer id);
}
