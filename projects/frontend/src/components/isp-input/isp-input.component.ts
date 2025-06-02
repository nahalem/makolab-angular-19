import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    FormGroupDirective,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MaterialModule } from '../../common/material.module';
import { InputTypes } from '../../common/enums/form-fields.enum';
import { IspFormErrorComponent } from '../isp-form-error/isp-form-error.component';

@Component({
    selector: 'isp-input',
    templateUrl: './isp-input.component.html',
    styleUrls: ['./isp-input.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
      IspFormErrorComponent
    ],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => IspInputComponent),
        },
    ],
})
export class IspInputComponent implements OnInit, ControlValueAccessor {
    @Input() form!: FormGroup;
    value: any;
    @Input() id!: string;
    @Input() placeholder!: string;
    @Input() label!: string;
    @Input() valid = true;
    @Input() max = 100;
    @Input() min = 0;
    @Input() controlName!: string;
    @Input() errors: any;
    @Input() showIcon: boolean = true;
    @Input() spellcheck: boolean = true;
    @Input() readonly: boolean = false;
    @Input() inputType!: InputTypes;
    @Input() regexPattern!: string;
    @Input() isRequired: boolean = false;
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();
    @Output() onInputValueChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCloseIconClicked: EventEmitter<any> = new EventEmitter<any>();
    type!: string;
    showCloseIcon: boolean = false;
    showInputIcon: boolean = true;

    get formField(): FormControl {
        return this.form.get(this.controlName) as FormControl;
    }

    onChange!: (value: string) => void;
    onTouched!: () => void;
    onChangeCallback: any = () => {};

    constructor(private parent: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.parent.form;
        this.type = InputTypes[this.inputType];
        this.initializeForm();
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // isDisabled ? this.form.get(this.controlName).disable() : this.form.get(this.controlName).enable();
    }

    onFocus(event: any) {
        this.focus.emit(event);
    }

    setValue($event: any): void {
        if (this.readonly) {
            return;
        }

        let _value = $event.target.value;

        if (!_value) {
            this.reset();
            _value = 0;
        }

        if (
            (this.type === 'number' &&
                Number($event.target.value) < this.min) ||
            Number($event.target.value) > this.max
        ) {
            _value = null;
            this.value = _value;
        }

        this.onChange(this.value);
        this.showCloseIcon = this.value && this.readonly ? false : true;
        this.showInputIcon = !this.showCloseIcon;
        this.onInputValueChange.emit(this.value);
    }

    reset(): void {
        this.formField.clearAsyncValidators();
        this.formField.reset();
        this.showCloseIcon = false;
        this.showInputIcon = !this.showCloseIcon;
        this.value = '';
        this.onCloseIconClicked.emit(this.value);
    }

    onKeyDownPress($event: any): void {
        if ($event.keyCode === 13) {
            $event.preventDefault();
        }
    }

    onNumericFieldKeyDownPress($event: any): void {
        switch ($event.keyCode) {
            case 38:
            case 40:
            case 9: // TAB
            case 13: // ENTER
                break;
            default:
                $event.preventDefault();
                break;
        }
    }

    private initializeForm(): void {
        if (this.form === undefined) {
            if (this.type === 'number') {
                this.form = new FormGroup({
                    [this.controlName]: new FormControl(
                        { value: this.value, disabled: this.readonly },
                        [
                            Validators.minLength(this.min),
                            Validators.maxLength(this.max),
                            Validators.pattern(this.regexPattern),
                        ]
                    ),
                });
            } else {
                this.form = new FormGroup({
                    [this.controlName]: new FormControl({
                        value: this.value,
                        disabled: this.readonly,
                    }),
                });
            }
            this.setFormValues();
        }
    }

    private setFormValues(): void {
        this.form.setValue({
            [this.controlName]: this.value === undefined ? '' : this.value,
        });
    }
}
