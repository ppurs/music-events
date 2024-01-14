import { ApplyStrategy } from "./apply.strategy";
import { FormBuilder, Validators } from "@angular/forms";
import { OfferApplicationPayload } from "../../../models/offer-application-payload";

export class FormApplyStrategy extends ApplyStrategy {
    applicationForm = this.fb.group({
        type: ["", Validators.required],
        bandName: [""],
        instrument: [""],
        genre: [""]
    })

    constructor (private fb: FormBuilder) {
        super();
    }

    override getFormValue(): OfferApplicationPayload {
        const payload = {
            type: this.applicationForm.get('type')?.value ?? "",
            bandName: this.applicationForm.get('bandName')?.value ?? "",
            instrument: this.applicationForm.get('instrument')?.value ?? "",
            genre: this.applicationForm.get('genre')?.value ?? "",
        }

        return payload;
    }
}