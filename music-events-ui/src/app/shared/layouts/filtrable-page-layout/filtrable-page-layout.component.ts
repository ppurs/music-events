import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-filtrable-page-layout',
  templateUrl: './filtrable-page-layout.component.html',
  styleUrls: ['./filtrable-page-layout.component.scss']
})
export class FiltrablePageLayoutComponent {
  @ContentChild('filterRef') filterTemplate!: TemplateRef<any>;
  @ContentChild('contentRef') contentTemplate!: TemplateRef<any>;
}
