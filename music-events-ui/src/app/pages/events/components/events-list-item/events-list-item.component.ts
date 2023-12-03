import { Component, Input, OnInit } from '@angular/core';

import { MusicEvent } from '../../models/music-event';

@Component({
  selector: 'events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss']
})
export class EventsListItemComponent implements OnInit {
  @Input() event!: MusicEvent;

  constructor() { }

  ngOnInit(): void {
  }

}
