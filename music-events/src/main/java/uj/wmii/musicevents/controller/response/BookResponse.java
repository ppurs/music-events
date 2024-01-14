package uj.wmii.musicevents.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BookResponse extends Response{
    private int orderId;

    public BookResponse(int orderId, boolean result) {
        super(result);

        this.orderId = orderId;
    }

    public BookResponse(int orderId, boolean result, String error) {
        super(result, error);

        this.orderId = orderId;
    }
}
