import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.scss']
})
export class FilterItemComponent implements OnInit {
  @Input() title!: string;

  types = [1, 2, 3, 4, 5]

  constructor() { }

  ngOnInit(): void {
  }

}
