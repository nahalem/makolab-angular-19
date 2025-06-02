import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../../common/material.module';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { OverlayService } from '../../../../../core/services/overlay/overlay.service';
import { CustomEventService } from '../../../../../core/services/custom-event/custom-event.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';
import { NotificationHelper } from '../../../../../core/services/notification/notification.helper';
import { ConcurrentExcerciseComponent } from '../../concurrency-excercise/concurrency-excercise.component';
import { LicensePlateProblemComponent } from '../../license-plate-problem/license-plate-problem.component';
import { TabsDefinition } from '../../../../../core/models/tabs.model';

@Component({
  selector: 'app-main-view',
  imports: [
    CommonModule,
    ToastrModule,
    MaterialModule,
    RouterModule,
    ConcurrentExcerciseComponent,
    LicensePlateProblemComponent
  ],
  providers:
  [
    { provide: ToastrService, useValue: ToastrService },
    { provide: NotificationService, useValue: NotificationService },
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent implements OnInit {
  tabsDefinition = signal<TabsDefinition[]>([]);
  selected = new FormControl(0);
  notifications: NotificationHelper;

  constructor(
      public overlayService: OverlayService,
      private _event: CustomEventService,
      private notificationService: NotificationService,
      private route: ActivatedRoute,
      private router: Router,
      @Inject(DOCUMENT) private document: Document
  ) {
    this.notifications = new NotificationHelper();
  }

  ngOnInit(): void {
    this.setTabDefinition();
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('====================================');
    console.log("@@@ event", event);
    console.log('====================================');

    switch (event.index) {
          case 0:
              console.log("@@@ TODO");
              break;
          case 1:
              console.log("@@@ TODO");
              break;
      }
  }

  isDisabled(item: TabsDefinition): boolean {
    if (item.selectedIndex === 0) {
        item.disabled = false;
    } else if (
        item.selectedIndex === 1) {
        item.disabled = false;
    }
    else if (
      item.selectedIndex === 1) {
      item.disabled = false;
    }
    return item.disabled!;
  }

  private setTabDefinition(): void {
    this.tabsDefinition.set([
      {
        selectedIndex: 0,
        title:
          'JS Concurrency Exercise'
      },
      {
        selectedIndex: 1,
        title:
          'The License Plate Problem'
      },
    ]);
 }

}
