import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material.module';
import { IspButtonComponent } from './isp-button/isp-button.component';
import { IspFormErrorComponent } from './isp-form-error/isp-form-error.component';
import { IspInputComponent } from './isp-input/isp-input.component';
import { IspIspDatepickerComponent } from './isp-datepicker/isp-datepicker.component';
import { IspTabComponent } from './isp-tab/isp-tab.component';
import { IspCheckboxComponent } from './isp-checkbox/isp-checkbox.component';
import { IspExpanderComponent } from './isp-expander/isp-expander.component';
import { IspIconComponent } from './isp-icon/isp-icon.component';
import { IspLabelComponent } from './isp-label/isp-label.component';
import { IspTextareaComponent } from './isp-textarea/isp-textarea.component';
import { IspIspDropdownComponent } from './isp-dropdown/isp-dropdown.component';
import { IspCheckboxesComponent } from './isp-checkboxes/isp-checkboxes.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@NgModule({
  imports: [
    MatCommonModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSpinnerModule,

    IspInputComponent,
    IspButtonComponent,
    IspFormErrorComponent,
    IspIspDatepickerComponent,
    IspTabComponent,
    IspCheckboxComponent,
    IspIconComponent,
    IspExpanderComponent,
    IspLabelComponent,
    IspTextareaComponent,
    IspIspDropdownComponent,
    IspCheckboxesComponent
  ],
  exports: [
    IspInputComponent,
    IspButtonComponent,
    IspFormErrorComponent,
    IspIspDatepickerComponent,
    IspTabComponent
  ],
  declarations: [

  ],
  providers: [
    NgxSpinnerService
  ]
})
export class ComponentsModule { }
