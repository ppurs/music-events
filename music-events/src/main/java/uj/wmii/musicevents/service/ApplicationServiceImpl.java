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
import uj.wmii.musicevents.constants.ApplicationStatus;
import uj.wmii.musicevents.model.Application;
import uj.wmii.musicevents.repository.ApplicationRepository;
import uj.wmii.musicevents.repository.util.ApplicationSpecifications;
import uj.wmii.musicevents.repository.util.OffsetBasedPageRequest;

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
            if (filter.getStatusIds() != null && filter.getStatusIds().size() > 0) {
                spec = spec.and(ApplicationSpecifications.hasStatus(filter.getStatusIds()));
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
            if (filter.getStartDate() != null) {
                spec = spec.and(ApplicationSpecifications.hasDateGTorEqual(filter.getStartDate()));
            }

            if (filter.getEndDate() != null) {
                spec = spec.and(ApplicationSpecifications.hasDateLTorEqual(filter.getEndDate()));
            }

            if (filter.getStatusIds() != null && filter.getStatusIds().size() > 0) {
                spec = spec.and(ApplicationSpecifications.hasStatus(filter.getStatusIds()));
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

    public void acceptApplication(int applicationId) {
        changeApplicationStatus(applicationId, ApplicationStatus.ACCEPTED);
    }

    public void rejectApplication(int applicationId) {
        changeApplicationStatus(applicationId, ApplicationStatus.REJECTED);
    }

    private void changeApplicationStatus(int applicationId, ApplicationStatus status) {
        Application applicationToUpdate = repository.getReferenceById(applicationId);
        applicationToUpdate.setStatus(status);
        repository.save(applicationToUpdate);
    }
}
