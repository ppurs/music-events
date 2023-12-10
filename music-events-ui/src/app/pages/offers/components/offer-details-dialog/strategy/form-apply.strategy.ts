import { MusicProfile } from "src/app/shared/models/music-profile";
import { ApplyStrategy } from "./apply.strategy";
import { FormBuilder } from "@angular/forms";

export class FormApplyStrategy extends ApplyStrategy {
    profileForm = this.fb.group({
        
    })

    constructor (private fb: FormBuilder) {
        super();
    }

    override getFormValue(): MusicProfile {
        const prof = {name: "cos tam"}

        return prof;
    }
}