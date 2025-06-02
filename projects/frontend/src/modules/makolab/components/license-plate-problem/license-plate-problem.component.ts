import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../../common/material.module';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { LicensePlateService } from '../../services/license-plate.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-license-plate-problem',
   imports: [
    CommonModule,
    ToastrModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  providers:
  [
    { provide: ToastrService, useValue: ToastrService },
    { provide: NotificationService, useValue: NotificationService },
  ],
  templateUrl: './license-plate-problem.component.html',
  styleUrl: './license-plate-problem.component.scss'
})
export class LicensePlateProblemComponent {
  index = 0;
  plate = '';

  constructor(
    private plateService: LicensePlateService
  ) {}

  getPlate() {
    this.plate = this.plateService.getPlate(this.index);
  }
}
