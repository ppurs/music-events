package uj.wmii.musicevents.service;
import uj.wmii.musicevents.controller.request.ApplicationFilterRequest;
import uj.wmii.musicevents.controller.request.template.SearchRequest;
import uj.wmii.musicevents.dto.ApplicationDTO;
import uj.wmii.musicevents.dto.StatusDTO;

import java.util.List;

public interface ApplicationService {
    List<ApplicationDTO> getApplicationsForOffer(SearchRequest<ApplicationFilterRequest> searchFilter, int offerId);
    List<ApplicationDTO> getUserApplications(SearchRequest<ApplicationFilterRequest> searchFilter, int userId);
    List<StatusDTO> getApplicationsStatuses();
    void acceptApplication(int applicationId);
    void rejectApplication(int applicationId);
}
