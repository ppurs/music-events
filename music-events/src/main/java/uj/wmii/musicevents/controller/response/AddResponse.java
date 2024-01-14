package uj.wmii.musicevents.controller.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AddResponse extends Response {
    int insertedId;

    public AddResponse(int insertedId, boolean result) {
        super(result);
        this.insertedId = insertedId;
    }
}
