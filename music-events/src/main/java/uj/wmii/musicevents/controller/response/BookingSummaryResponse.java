package uj.wmii.musicevents.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BookingSummaryResponse extends Response {
    private float total;

    public BookingSummaryResponse(float total, boolean result) {
        super(result);

        this.total = total;
    }

    public BookingSummaryResponse(float total, boolean result, String error) {
        super(result, error);

        this.total = total;
    }
}
