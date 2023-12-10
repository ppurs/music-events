import { FormGroup } from "@angular/forms";

export abstract class ApplyStrategy {
    abstract profileForm: FormGroup

    constructor () {}

    abstract getFormValue(): any;
}