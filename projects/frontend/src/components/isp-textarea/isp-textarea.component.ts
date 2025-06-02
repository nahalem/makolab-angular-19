import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { MaterialModule } from '../../common/material.module';
import { IspFormErrorComponent } from '../isp-form-error/isp-form-error.component';

@Component({
    selector: 'isp-textarea',
    templateUrl: './isp-textarea.component.html',
    styleUrls: ['./isp-textarea.component.scss'],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
      IspFormErrorComponent
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IspTextareaComponent),
            multi: true,
        },
    ],
})
export class IspTextareaComponent implements OnInit, ControlValueAccessor {
    @Input() form!: FormGroup;
    value: any;
    @Input() id!: string;
    @Input() name!: string;
    @Input() placeholder!: string;
    @Input() label!: string;
    @Input() valid = true;
    @Input() maxChars: number = 255;
    @Input() minChars = 10;
    @Input() controlName = '';
    @Input() errors: any;
    @Input() cols = 120;
    @Input() rows = 3;
    @Input() readonly: boolean = false;
    @Input() isRequired: boolean = false;
    @Output() onInputValueChange: EventEmitter<any> = new EventEmitter<any>();
    chars = 0;
    isEmptyValue: boolean = false;

    onChange!: (value: string) => void;
    onTouched!: () => void;
    onChangeCallback: any = () => {};

    get formField(): FormControl {
        return this.form.get(this.controlName) as FormControl;
    }

    constructor() {}

    ngOnInit(): void {
        this.initializeForm();
    }

    writeValue(obj: any): void {
        this.onValueCheck(obj);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // setDisabledState?(isDisabled: boolean): void {
    //     isDisabled ? this.form.disable() : this.form.enable();
    // }

    change(value: any): void {
        this.onChangeCallback(value.target.value);
    }

    setValue(value: any): void {
        if (this.readonly) {
            return;
        }

        this.onValueCheck(this.value);
        this.onChange(this.value);
        this.onInputValueChange.emit(this.value);
    }

    onValueCheck(value: string) : void {
      if(value) {
        const trimmedValue = value.toString().trim();
        if (trimmedValue.length === 0) {
          this.value = null;
          value = '';
          this.isEmptyValue = true;
          this.onChange(this.value);
          this.onInputValueChange.emit(this.value);
        } else {
          this.value = value;
          this.isEmptyValue = false;
        }
      }
    }

    private initializeForm(): void {
        if (this.form === undefined) {
            this.form = new FormGroup({
                [this.controlName]: new FormControl({
                    value: this.value,
                    disabled: this.readonly,
                }),
                // [this.controlName]: new FormControl({value: this.value}),
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
