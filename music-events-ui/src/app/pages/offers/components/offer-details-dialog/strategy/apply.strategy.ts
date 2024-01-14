import { FormGroup } from "@angular/forms";

export abstract class ApplyStrategy {
    abstract applicationForm: FormGroup

    constructor () {}

    abstract getFormValue(): any;
}