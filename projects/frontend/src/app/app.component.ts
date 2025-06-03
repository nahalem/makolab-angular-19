import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../common/material.module';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../core/services/notification/notification.service';
import { OverlayService } from '../core/services/overlay/overlay.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MaterialModule, NgxSpinnerModule ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  constructor(
    public overlayService: OverlayService,
    public notificationService: NotificationService,
    private spinnerService: NgxSpinnerService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any
  ) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }

  title = 'frontend';
}
