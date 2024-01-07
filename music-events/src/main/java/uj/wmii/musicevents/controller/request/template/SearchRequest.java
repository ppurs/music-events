package uj.wmii.musicevents.controller.request.template;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchRequest<T> {
    private T filter;
    private int offset;
}
