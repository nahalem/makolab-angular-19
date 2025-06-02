import {
    AfterViewInit,
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
    FormGroupDirective,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DropDownItem } from '../../core/models/drop-down.model';
import { generateGUID } from '../../core/helpers/guid-manager';
import { MaterialModule } from '../../common/material.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'isp-checkboxes',
    templateUrl: './isp-checkboxes.component.html',
    styleUrls: ['./isp-checkboxes.component.scss'],
    imports:[
      CommonModule,
      ReactiveFormsModule,
      MaterialModule,
      FormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => IspCheckboxesComponent),
        },
    ],
})
export class IspCheckboxesComponent
    implements OnInit, AfterViewInit, ControlValueAccessor
{
    @Input() form!: FormGroup;
    @Input() options: any;

    // @Input() set options(options: any) {
    //   if(!options) {
    //     return;
    //   }
    //   console.log('IspCheckboxesComponent [options]', options);
    //   this.writeValue(this.options);
    // }

    // get options(): any {
    //   return this._options;
    // }

    @Input() id!: string;
    @Input() label!: string;
    @Input() name!: string;
    @Input() controlName: string = 'checkbox';
    @Input() errors: any;
    @Input() disabled: boolean = false;
    @Input() color: string = 'rgb(0,0,0)';
    @Input() position: string = 'horizontal'; // 'vertical'
    @Input() numberOfRows: number[] = [3];
    @Output() focus: EventEmitter<any> = new EventEmitter<any>();
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
    checked = false;
    indeterminate = false;
    // ControlValueAccessor Implementation
    onChange!: (value: any) => void;
    onTouched!: () => void;
    onChangeCallback: any = () => {};
    private _options: any;

    constructor(
        private parent: FormGroupDirective,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.form = this.parent.form;
        this.initializeForm();
        this.cd.detectChanges();
    }

    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    onModelChange(obj: DropDownItem) {}

    onChangeBox(ob: MatCheckboxChange, obj: DropDownItem) {
        obj.active = ob.checked;
        const _options = this.mapItems(obj);
        this.writeValue(_options);
        this.onChange(this.options);
        this.onTouched();
        this.cd.detectChanges();
    }

    setValue(obj: DropDownItem): void {
        this.cd.detectChanges();
    }

    // view --> model
    registerOnChange(fn: (value: string) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        //this.disabled = isDisabled;
    }

    writeValue(obj: any): void {
        if (this.options && this.options.length > 0) {
            //this.getSelectedItemsForMultiSelectionMode();
            // this.selected = this.options.find(o => { return o.active; } );
            this.mapItems(this.options);
        }
    }

    private mapItems(obj?: any): any[] {
        const _options = this.options.map((option: any) => {
            if (obj.label === option.label) {
                option.active = obj.active;
            }
            return option;
        });
        return _options;
    }

    private initializeForm(): void {
        if (this.form === undefined) {
            this.form = new FormGroup({
                [this.controlName]: new FormControl(''),
            });
        }

        if (this.options) {
            this.options.forEach((item: any) => {
                const _id = generateGUID();
                const _controlName = `${this.controlName}_${_id}`; //this.controlName + '_' +item.id;
                item.other = _controlName;
                this.addFormControl(_controlName, new FormControl(item));
            });
        }
    }

    private addFormControl(
        controlName: string,
        formControl: FormControl
    ): void {
        this.form.addControl(controlName, formControl);
    }
}
