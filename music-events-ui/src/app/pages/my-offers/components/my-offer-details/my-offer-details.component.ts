import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatChip, MatChipList } from '@angular/material/chips';
import { Observable, Subject, forkJoin, of, switchMap } from 'rxjs';

import { Application } from 'src/app/pages/applications/models/application';
import { ApplicationsFilter } from 'src/app/pages/applications/models/applications-filter';
import { MyOffersFacade } from '../../services/my-offers-facade/my-offers.facade';
import { Offer } from 'src/app/pages/offers/models/offer';
import { Option } from 'src/app/shared/models/option';

@Component({
  selector: 'my-offer-details',
  templateUrl: './my-offer-details.component.html',
  styleUrls: ['./my-offer-details.component.scss']
})
export class MyOfferDetailsComponent implements OnInit {
  @ViewChild(MatChipList) chipList!: MatChipList;

  offer!: Offer;
  applications$: Observable<Application[]>;
  statuses: Option[];
  allApplicationsLoaded$: Observable<boolean>;
  isUpdating$: Observable<boolean>;
  applicationsLoaded: boolean;

  private reloadTrigger: Subject<ApplicationsFilter>;

  constructor(private route: ActivatedRoute,
              private offersFacade: MyOffersFacade,
              private cdref: ChangeDetectorRef) {
    this.applications$ = this.offersFacade.getOfferApplications();
    this.statuses = [];
    this.allApplicationsLoaded$ = this.offersFacade.allApplicationsLoaded();
    this.isUpdating$ = this.offersFacade.isApplicationListUpdating();

    this.applicationsLoaded = false;
    this.reloadTrigger = new Subject<ApplicationsFilter>();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.offersFacade.getOffer(id).subscribe( res => this.offer = res )
    
    forkJoin([
      this.offersFacade.getApplicationFilterOptions(),
      this.offersFacade.loadOfferApplications(id)
    ]).subscribe(([options, applications]) => {
      this.statuses = options.statuses
      this.applicationsLoaded = true;
    });

    this.reloadTrigger
        .pipe(switchMap(filter => this.offersFacade.loadOfferApplications(this.offer.id!, filter)))
        .subscribe();
  }

  ngAfterViewInit(): void {
    this.chipList.chips.forEach((chip) => chip.select());
    this.cdref.detectChanges();
  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();

    const statusIds = this.chipList.chips
      .filter(c => c.selected)
      .map(c => c.value);

    const filter: ApplicationsFilter = {statusIds: statusIds};
    this.applyFilter(filter);
  }

  fetchMore(): void {
    this.offersFacade.fetchMoreApplications(this.offer.id!);
  }

  applyFilter(filter: ApplicationsFilter): void {
    this.reloadTrigger.next(filter);
  }

  acceptApplication(event: boolean, id: number) {
    if (event) {
      this.offersFacade.acceptApplication(id).subscribe();
    }
    else {
      this.offersFacade.rejectApplication(id).subscribe();
    }
  }
}
