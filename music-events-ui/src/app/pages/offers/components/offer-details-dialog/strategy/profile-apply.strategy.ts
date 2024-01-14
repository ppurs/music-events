import { FormBuilder, Validators } from "@angular/forms";

import { ApplyStrategy } from "./apply.strategy";
import { OfferApplicationPayload } from "../../../models/offer-application-payload";
import { MusicProfile } from "src/app/pages/profile/models/music-profile";

export class ProfileApplyStrategy extends ApplyStrategy {
    applicationForm = this.fb.group({
        profile: [null, Validators.required]
    })

    constructor (private fb: FormBuilder) {
        super();
    }

    override getFormValue(): OfferApplicationPayload {
        const profile: MusicProfile | null = this.applicationForm.get('profile')!.value;

        return {
            profileId: profile!.id,
            type: profile!.type,
            bandName: profile!.bandName,
            instrument: profile!.instrument, 
            genre: profile!.genre
        }
    }
}