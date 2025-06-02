import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../common/material.module';
import { DropDownItem } from '../../core/models/drop-down.model';
import { IspFormErrorComponent } from '../isp-form-error/isp-form-error.component';

@Component({
    selector: 'isp-dropdown',
    templateUrl: './isp-dropdown.component.html',
    styleUrls: ['./isp-dropdown.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
      IspFormErrorComponent
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => IspIspDropdownComponent),
        },
    ],
})
export class IspIspDropdownComponent implements ControlValueAccessor, OnInit {
    @ViewChild(MatSelect) matSelect: MatSelect | undefined;
    @Input() form!: FormGroup;
    @Input() controlName!: string;
    @Input() options!: DropDownItem[];
    @Input() multi: boolean = false;
    @Input() placeholder?: string;
    @Input() isDisabled: boolean = false;
    @Input() isDisabledOptionItem: boolean = false;
    @Input() caret: boolean = true;
    @Input() name?: string;
    @Input() label?: string;
    @Input() isRequired: boolean = false;
    @Input() selected: any;
    @Input() selectedMulti?: DropDownItem[];
    @Input() showEmptyItem: boolean = false;
    @Input() showOtherItemsForMultiSelection: boolean = false;
    @Output() selectionChange: EventEmitter<MatSelectChange> =
        new EventEmitter<MatSelectChange>();
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    onChange: ((value: any) => void) | undefined;
    onTouched: (() => void) | undefined;
    onChangeCallback: any = () => {};

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.showOtherItemsForMultiSelection =
            this.multi && this.showOtherItemsForMultiSelection ? true : false;
        this.initializeForm();
        this.disableSelect()
        this.cd.detectChanges();
    }

    selectionChanged(event: MatSelectChange) {
        if (!event || !event.value) {
            this.valueChange.emit({});
            return;
        }

        event.value.active = !event.value.active;
        this.mapItems(event.value);
        this.selectionChange.emit(
            new MatSelectChange(this.matSelect!, event.value)
        );

        this.valueChange.emit(event.value);
        this.onChange!(event.value);
        this.onTouched!();
    }

    disableSelect() {
      if(this.isDisabled) {
        this.form.controls[this.controlName!].disable();
      } else {
        this.form.controls[this.controlName!].enable();
      }
    }

    change(obj: any): void {
        if (!obj.active) {
            return;
        }

        obj.active = !obj.active;
        this.mapItems(obj);
        this.selectionChange.emit(new MatSelectChange(this.matSelect!, obj));
        this.valueChange.emit(this.options);
        this.onChange!(this.options);
        this.onTouched!();
    }

    writeValue(obj: any): void {
        if (!obj) {
            return;
        }
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {}

    getOptionValue(option: any): string {
        if (!option && option.active) {
            return '';
        }
        return option.value;
    }

    private initializeForm(): void {
        this.selectedMulti;
        if (this.options && this.options.length > 0) {
            if (this.form === undefined) {
                this.form = new FormGroup({
                    [this.controlName!]: new FormControl(this.options),
                });
            }
        }
    }

    private mapItems(obj: any): void {
        if (this.multi) {
            this.selectedMulti = [];
            obj.forEach((element: any) => {
                element.active = true;
            });
            this.selectedMulti = obj;
        } else {
            this.options = this.options.map(option => {
                if (obj.value === option.value) {
                    option.active = obj.active;
                } else {
                    option.active = false;
                }

                return option;
            });
        }
    }
}
