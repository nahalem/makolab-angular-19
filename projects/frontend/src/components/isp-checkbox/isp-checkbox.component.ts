import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MaterialModule } from '../../common/material.module';
import { IspFormErrorComponent } from '../isp-form-error/isp-form-error.component';

@Component({
    selector: 'isp-checkbox',
    templateUrl: './isp-checkbox.component.html',
    styleUrls: ['./isp-checkbox.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
      FormsModule,
      IspFormErrorComponent
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => IspCheckboxComponent),
        },
    ],
})
export class IspCheckboxComponent implements OnInit, ControlValueAccessor {
    value: any;
    @Input() form!: FormGroup;
    @Input() id!: string;
    // @Input() label: string;
    @Input() name!: string;
    @Input() controlName!: string;
    @Input() errors: any;
    @Input() isEditable: boolean = false;

    checked = false;
    indeterminate = false;
    disabled = false;

    onChange!: (value: boolean) => void;
    onTouched!: () => void;
    onChangeCallback: any = () => {};

    constructor() {}

    ngOnInit(): void {
        this.initializeForm();
    }

    writeValue(obj: boolean): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // console.log('IspCheckboxComponent setDisabledState [isDisabled]', isDisabled);
        // isDisabled ? this.form.disable() : this.form.enable();
    }

    onChangeBox(ob: MatCheckboxChange) {
        this.value = ob.checked;
        this.onChange(ob.checked);
        this.onTouched();
    }

    setValue(value: boolean): void {
        this.value = !value;
        this.onChange(this.value);
        this.onTouched();
    }

    private initializeForm(): void {
        if (this.form === undefined) {
            this.form = new FormGroup({
                [this.controlName]: new FormControl([]),
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
