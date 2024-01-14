package uj.wmii.musicevents.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Sort;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SortOrderRequest {
    private Sort.Direction order;
    private String field;
}
