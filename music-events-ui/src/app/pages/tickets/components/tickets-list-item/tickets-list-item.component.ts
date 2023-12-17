import { Component, Input } from '@angular/core';

import { Ticket } from '../../models/ticket';

@Component({
  selector: 'tickets-list-item',
  templateUrl: './tickets-list-item.component.html',
  styleUrls: ['./tickets-list-item.component.scss']
})
export class TicketsListItemComponent {
  @Input() ticket!: Ticket;

  private readonly ID_LENGTH = 15

  transformId(id: number): string {
    const zeros = this.ID_LENGTH - (id / 10)
    
    return "0".repeat(zeros) + id;
  }
}
