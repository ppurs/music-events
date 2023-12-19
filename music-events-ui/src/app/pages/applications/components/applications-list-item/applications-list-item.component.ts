import { Component, Input, OnInit } from '@angular/core';

import { Application } from '../../models/application';

@Component({
  selector: 'applications-list-item',
  templateUrl: './applications-list-item.component.html',
  styleUrls: ['./applications-list-item.component.scss']
})
export class ApplicationsListItemComponent implements OnInit {
  @Input() application!: Application;

  constructor() { }

  ngOnInit(): void {
  }

}
