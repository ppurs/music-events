import { FormBuilder, Validators } from "@angular/forms";

import { ApplyStrategy } from "./apply.strategy";
import { OfferApplicationPayload } from "../../../models/offer-application-payload";

export class ProfileApplyStrategy extends ApplyStrategy {
    applicationForm = this.fb.group({
        profileId: [null, Validators.required]
    })

    constructor (private fb: FormBuilder) {
        super();
    }

    override getFormValue(): OfferApplicationPayload {
        return {profileId: this.applicationForm.get('profileId')?.value ?? -1 }
    }
}