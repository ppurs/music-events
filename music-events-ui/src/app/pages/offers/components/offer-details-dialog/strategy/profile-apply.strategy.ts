import { FormBuilder, Validators } from "@angular/forms";

import { ApplyStrategy } from "./apply.strategy";
import { MusicProfile } from "src/app/shared/models/music-profile";

export class ProfileApplyStrategy extends ApplyStrategy {
    profileForm = this.fb.group({
        profileId: [null, Validators.required]
    })

    constructor (private fb: FormBuilder) {
        super();
    }

    override getFormValue(): MusicProfile {
        return {id: this.profileForm.get('profileId')?.value ?? -1 }
    }
}