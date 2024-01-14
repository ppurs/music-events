import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Application } from 'src/app/pages/applications/models/application';

@Component({
  selector: 'user-application-item',
  templateUrl: './user-application-item.component.html',
  styleUrls: ['./user-application-item.component.scss']
})
export class UserApplicationItemComponent implements OnInit {
  @Input() application!: Application;
  @Output() acceptApplication: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  changeApplicationStatus(status: string) {
    this.acceptApplication.emit(status == "accept");
  }

}
