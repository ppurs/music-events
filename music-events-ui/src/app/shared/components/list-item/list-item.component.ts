import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @ContentChild('imgRef') imgTemplate!: TemplateRef<any>;
  @ContentChild('descRef') descTemplate!: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
