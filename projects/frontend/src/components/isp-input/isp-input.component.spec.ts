import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    ReactiveFormsModule,
} from '@angular/forms';
import { IspInputComponent } from './isp-input.component';
import { InputTypes } from '@app/core/enums/form-fields.enum';
import { MatIconModule } from '@angular/material/icon';

describe('IspInputComponent', () => {
    let component: IspInputComponent;
    let fixture: ComponentFixture<IspInputComponent>;
    let formGroupDirective: FormGroupDirective; // Add this line

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatIconModule],
            declarations: [IspInputComponent],
            providers: [FormGroupDirective],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspInputComponent);
        component = fixture.componentInstance;
        component.controlName = 'testControl';
        component.inputType = InputTypes.text;
        component.form = new FormGroup({
            testControl: new FormControl(),
        });

        formGroupDirective = TestBed.inject(FormGroupDirective);
        formGroupDirective.form = component.form; // Associate the formGroupDirective with the component's form
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the form control value when the component value changes', () => {
        const inputElement = fixture.nativeElement.querySelector('input');
        inputElement.value = 'test value';
        inputElement.dispatchEvent(new Event('input'));
        expect(component.form.controls.testControl.value).toBe('test value');
    });

    it('should run setValue method when the component value changes (keyup)', () => {
        component.onChange = jest.fn();
        const inputElement = fixture.nativeElement.querySelector('input');
        inputElement.value = 'test value';
        inputElement.dispatchEvent(new Event('keyup'));
        expect(component.onChange).toHaveBeenCalled();
    });

    it('should reset the form control value when the reset method is called', () => {
        component.form.controls.testControl.setValue('test value');
        component.reset();
        fixture.detectChanges();
        expect(component.form.controls.testControl.value).toBe('');
    });

    it('should emit the close icon clicked event when the close icon is clicked', () => {
        jest.spyOn(component.onCloseIconClicked, 'emit');
        component.showCloseIcon = true;
        fixture.detectChanges();
        const closeIcon = fixture.nativeElement.querySelector('.mat-icon');
        closeIcon.dispatchEvent(new Event('click'));
        expect(component.onCloseIconClicked.emit).toHaveBeenCalled();
    });
});
