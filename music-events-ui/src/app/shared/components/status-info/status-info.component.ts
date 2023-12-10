import { Component, Input } from '@angular/core';

import { RequestStatus } from '../../models/request-status';

@Component({
  selector: 'app-status-info',
  templateUrl: './status-info.component.html',
  styleUrls: ['./status-info.component.scss']
})
export class StatusInfoComponent {
  status: RequestStatus;

  constructor() { 
    this.status = RequestStatus.LOADING;
  }

  setStatus(status: RequestStatus): void {
    this.status = status;
  }
}
