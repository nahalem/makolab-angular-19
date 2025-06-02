import { CommonModule } from '@angular/common';
import {
    ChangeDetectorRef,
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
import { SelectItem } from '../../core/models/selected-item.model';
import { MatRadioChange } from '@angular/material/radio';

@Component({
    selector: 'isp-radio',
    templateUrl: './isp-radio.component.html',
    styleUrls: ['./isp-radio.component.scss'],
     standalone: true,
        imports: [
          CommonModule,
          ReactiveFormsModule,
          MaterialModule
        ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => IspRadioComponent),
        },
    ],
})
export class IspRadioComponent implements OnInit, ControlValueAccessor {
    @Input() form!: FormGroup;
    value: any;
    @Input() options: SelectItem[] = [];
    @Input() id!: string;
    @Input() label: string | undefined;
    @Input() name: string | undefined;
    @Input() formControlName!: string;
    @Input() errors: any;
    @Input() isEditable: boolean = false;
    @Output() focus = new EventEmitter<any>();
    @Input() control: FormControl | undefined;
    @Output() onInputValueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    onChange!: (value: any) => void;
    onTouched!: () => void;
    onChangeCallback: any = () => {};

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    writeValue(value: any): void {
      this.value = value;

      if (this.form && this.formControlName) {
        this.form.get(this.formControlName)?.setValue(value, { emitEvent: false });
      }

      this.cd.detectChanges();
    }

    onRadioButtonChange(event: SelectItem | undefined) {
      this.value = event?.value;
      this.onChange(this.value);
      this.onTouched();
      this.onInputValueChange.emit(this.value.active);
    }

    onRadioClick(option: SelectItem | undefined) {
      this.value = option?.value;
      this.onChange(this.value);
      this.onTouched?.();
      this.onInputValueChange.emit(this.value.active);
    }

    trackByValue(index: number, item: SelectItem): string | undefined {
      return item.value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {}

    setValue(obj: any): void {
        obj.active = obj.value = !obj.active;
        this.onChange(obj);
        this.onTouched();
        this.cd.detectChanges();
    }

    onFocus(event: any) {
        this.focus.emit(event.target.value);
    }

    mousedown(obj: any): void {
      console.log("@@@ mousedown obj", obj);
    }

    private mapItems(obj: SelectItem): void {
        if (!obj) {
            return;
        }

        this.options = this.options.map(option => {
            if (obj.label === option.label) {
                option.active  = true;
            } else {
                option.active  = false;
            }
            return option;
        });
    }

    private initializeForm(): void {
        if (this.form === undefined) {
            this.form = new FormGroup({
                [this.formControlName!]: new FormControl(''),
            });
        }
    }
}
