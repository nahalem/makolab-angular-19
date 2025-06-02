import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../common/material.module';
import { NotificationService } from '../../core/services/notification/notification.service';
import { MedicinesService } from './services/medicines.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-makolab',
  imports: [
    CommonModule,
    ToastrModule,
    MaterialModule,
    RouterOutlet,
    RouterModule,
    // NgxSpinnerModule
  ],
  providers:
  [
    { provide: ToastrService, useValue: ToastrService },
    { provide: NotificationService, useValue: NotificationService },
    { provide: MedicinesService, useValue: MedicinesService}
  ],
  templateUrl: './makolab.component.html',
  styleUrl: './makolab.component.scss'
})
export class MakolabComponent {

}
