package uj.wmii.musicevents.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import uj.wmii.musicevents.controller.request.ApplicationFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.ApplicationDTO;
import uj.wmii.musicevents.dto.StatusDTO;
import uj.wmii.musicevents.dto.mapper.ApplicationMapper;
import uj.wmii.musicevents.enums.ApplicationStatus;
import uj.wmii.musicevents.model.Application;
import uj.wmii.musicevents.repository.ApplicationRepository;
import uj.wmii.musicevents.repository.util.ApplicationSpecifications;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService{
    @Autowired
    private ApplicationRepository repository;
    @Autowired
    private ApplicationMapper mapper;

    public List<ApplicationDTO> getApplicationsForOffer(SearchRequest<ApplicationFilterRequest> searchFilter, int offerId) {
        Specification<Application> spec = Specification.where(ApplicationSpecifications.forOffer(offerId));
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), Sort.by(Sort.Direction.DESC, "submitDate"));

        ApplicationFilterRequest filter = searchFilter.getFilter();

        if(filter != null) {
            if (filter.getStatuses() != null && filter.getStatuses().size() > 0) {
                spec = spec.and(ApplicationSpecifications.hasStatus(filter.getStatuses()));
            }
        }

        return repository.findAll(spec, page)
                .map(mapper::mapToDTOForOrganizer)
                .getContent();
    }

    public List<ApplicationDTO> getUserApplications(SearchRequest<ApplicationFilterRequest> searchFilter, int userId) {
        Specification<Application> spec = Specification.where(ApplicationSpecifications.submittedBy(userId));
        Pageable page = new OffsetBasedPageRequest(searchFilter.getOffset(), Sort.by(Sort.Direction.DESC, "offer_date"));

        ApplicationFilterRequest filter = searchFilter.getFilter();

        if(filter != null) {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

            if (filter.getStartDate() != null) {
                try {
                    spec = spec.and(ApplicationSpecifications.hasDateGTorEqual(dateFormat.parse(filter.getStartDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }

            if (filter.getEndDate() != null) {
                try {
                    spec = spec.and(ApplicationSpecifications.hasDateLTorEqual(dateFormat.parse(filter.getEndDate())));
                } catch (ParseException e) {
                    System.out.println("[ERROR]: " + e);
                }
            }

            if (filter.getStatuses() != null && filter.getStatuses().size() > 0) {
                spec = spec.and(ApplicationSpecifications.hasStatus(filter.getStatuses()));
            }
        }

        return repository.findAll(spec, page)
                .map(mapper::mapToDTOForUser)
                .getContent();
    }

    public List<StatusDTO> getApplicationsStatuses() {
        return Arrays.stream(ApplicationStatus.values())
                .map(val -> new StatusDTO(val.ordinal(), val.name()))
                .collect(Collectors.toList());
    }
}
