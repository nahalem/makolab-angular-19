import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    MatCheckboxChange,
    MatCheckboxModule,
} from '@angular/material/checkbox';
import { IspCheckboxesComponent } from './isp-checkboxes.component';
import { generateGUID } from '@app/core/helpers/guid-manager';
import { forwardRef } from '@angular/core';
import { MaterialModule } from '../material.module';
import { DropDownItem } from '@app/core/models/drop-down.model';

describe('IspCheckboxesComponent', () => {
    let component: IspCheckboxesComponent;
    let fixture: ComponentFixture<IspCheckboxesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatCheckboxModule, ReactiveFormsModule, MaterialModule],
            providers: [
                { provide: generateGUID, useValue: () => 'mock-guid' },
                {
                    provide: FormGroupDirective,
                    useValue: forwardRef(() => new FormGroupDirective([], [])),
                },
            ],
            declarations: [IspCheckboxesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspCheckboxesComponent);
        component = fixture.componentInstance;
        component.onChange = jest.fn();
        component.onTouched = jest.fn();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with default values', () => {
        const form = new FormGroup({
            checkbox: new FormControl(''),
        });
        component.form = form;

        component.ngOnInit();
        expect(component.options).toBeUndefined();

        expect(component.form.controls.checkbox).toBeDefined();
        expect(component.form.controls.checkbox.value).toBe('');

        expect(component.label).toBeUndefined();
        expect(component.disabled).toBeFalsy();
    });

    it('should handle checkbox change event', () => {
        const checkbox: DropDownItem = {
            id: 1,
            label: 'Option 1',
            value: 'Option 1',
            active: false,
            other: 'other',
        };
        jest.spyOn(component, 'onChange');
        component.options = [checkbox];
        component.controlName = 'checkbox';

        const mockCheckboxChange: MatCheckboxChange = {
            checked: true,
            source: null,
        };
        component.ngOnInit();
        fixture.detectChanges();
        component.onChangeBox(mockCheckboxChange, checkbox);
        fixture.detectChanges();
        expect(checkbox.active).toBeTruthy();
    });
});
