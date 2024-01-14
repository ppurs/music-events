package uj.wmii.musicevents.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uj.wmii.musicevents.constants.ApplicationStatus;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationFilterRequest {
    private Date startDate;
    private Date endDate;
    private List<ApplicationStatus> statusIds;
}
