import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MaterialModule } from '../../common/material.module';
import { IspFormErrorComponent } from '../isp-form-error/isp-form-error.component';
import moment from 'moment';

@Component({
  selector: 'app-isp-datepicker',
  templateUrl: './isp-datepicker.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,

    RouterModule,
    ReactiveFormsModule,
    IspFormErrorComponent
  ],
  styleUrls: ['./isp-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => IspIspDatepickerComponent),
  }]
})
export class IspIspDatepickerComponent implements OnInit, ControlValueAccessor {

  value: any;
  @Input() id!: any;
  @Input() label! : string;
  @Input() clear! : string;
  @Input() controlName = '';
  @Input() errors: any;
  @Input() placeholder: string = 'yyyy-mm-dd';
  @Input() form!: FormGroup;
  @Output() focus = new EventEmitter<any>();
  @Input() control!: FormControl;
  @Input() isEditable: boolean = false;
  @Input() minDate! : any;
  @Input() maxDate! : any;

  placement = 'bottom';

  onChange!: (value: any) => void;
  onTouched!: () => void;
  onChangeCallback: any = () => { };

  get formField(): FormControl {
    return this.form.get(this.controlName) as FormControl;
  }

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  writeValue(obj: any): void {
    if(!obj) {
      return;
    }
    this.value = moment(obj).format("YYYY-MM-DD");
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
	}

	registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  change(value: any): void {
    this.onChangeCallback(value);
  }

  onDateSelect(event: any){
    this.value = event;
    this.onChange(this.value);
    this.onTouched();
    this.cd.detectChanges();
  }

  onFocus(event: any) {
    this.focus.emit(event);
  }

  mousedown(): void {
  }

  clearDate(event: any) {
    this.value = "";
    this.formField.clearAsyncValidators();
    this.formField.reset();
  }

  private initializeForm(): void {
    if (this.form === undefined) {
      this.form = new FormGroup({
        [this.controlName]: new FormControl({value: this.value, disabled: this.isEditable}),
      });
      this.setFormValues();
    }
  }

  private setFormValues(): void {
    this.form.setValue({
      [this.controlName]: this.value === undefined ? '' : this.value,
    });
  }
}
