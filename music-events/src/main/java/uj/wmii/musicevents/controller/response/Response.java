package uj.wmii.musicevents.controller.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private boolean result;
    private String error;

    public Response (boolean result) {
        this.result = result;
    }
}
