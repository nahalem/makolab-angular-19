import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
    MatCheckbox,
    MatCheckboxChange,
    MatCheckboxModule,
} from '@angular/material/checkbox';
import { IspCheckboxComponent } from './isp-checkbox.component';

describe('IspCheckboxComponent', () => {
    let component: IspCheckboxComponent;
    let fixture: ComponentFixture<IspCheckboxComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatCheckboxModule],
            declarations: [IspCheckboxComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspCheckboxComponent);
        component = fixture.componentInstance;
        component.form = new FormGroup({
            controlName: new FormControl(),
        });
        component.onChange = jest.fn();
        component.onTouched = jest.fn();
        component.id = 'checkboxId';
        component.name = 'Checkbox Name';
        component.controlName = 'controlName';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('element is unchecked by default', () => {
        const checkbox = fixture.debugElement.query(By.css('.info-checkbox'));
        expect(checkbox).toBeTruthy();
        expect(checkbox.nativeElement.checked).toBeFalsy();
    });

    it('should update value and emit changes on checkbox click', () => {
        const checkbox = fixture.debugElement.query(By.css('.info-checkbox'));
        const onChangeSpy = jest.spyOn(component, 'onChangeBox');
        const mockChangeEvent = { checked: true } as MatCheckboxChange;
        checkbox.triggerEventHandler('change', mockChangeEvent);
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy).toHaveBeenCalledWith(mockChangeEvent);
        expect(component.value).toBeTruthy();
    });

    it('should update value and emit changes on keyup event', () => {
        const checkbox = fixture.debugElement.query(By.css('.info-checkbox'));
        jest.spyOn(component, 'setValue');
        const mockKeyupEvent = { target: { value: true } };
        checkbox.triggerEventHandler('keyup', mockKeyupEvent);
        fixture.detectChanges();
        expect(component.setValue).toHaveBeenCalled();
        expect(component.value).toBeTruthy();
    });

    it('should set the disabled state of the checkbox', () => {
        component.disabled = true;
        fixture.detectChanges();
        const checkbox = fixture.debugElement.query(By.directive(MatCheckbox));
        expect(checkbox.componentInstance.disabled).toBeTruthy();
    });
});
