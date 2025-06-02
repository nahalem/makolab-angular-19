import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { IspRadioComponent } from './isp-radio.component';

describe('IspRadioComponent', () => {
    let component: IspRadioComponent;
    let fixture: ComponentFixture<IspRadioComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [IspRadioComponent],
            imports: [ReactiveFormsModule, MatRadioModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IspRadioComponent);
        component = fixture.componentInstance;
        component.options = [
            { label: 'Option 1', value: true },
            { label: 'Option 2', value: false },
        ];
        component.form = new FormGroup({
            testControl: new FormControl(),
        });
        component.formControlName = 'testControl';
        component.name = 'testName';
        component.label = 'Test Label';
        component.onChange = jest.fn();
        component.onTouched = jest.fn();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display label when label input is provided', () => {
        const labelElement = fixture.debugElement.query(
            By.css('.uk-form-label')
        );
        expect(labelElement.nativeElement.textContent.trim()).toBe(
            'Test Label'
        );
    });

    it('should display options when options input is provided', () => {
        const optionElements = fixture.debugElement.queryAll(
            By.css('mat-radio-button')
        );
        expect(optionElements.length).toBe(2);
        expect(optionElements[0].nativeElement.textContent.trim()).toBe(
            'Option 1'
        );
        expect(optionElements[1].nativeElement.textContent.trim()).toBe(
            'Option 2'
        );
    });

    it('should emit focus event when option is focused', () => {
        jest.spyOn(component.focus, 'emit');
        const optionElement = fixture.debugElement.query(
            By.css('mat-radio-button')
        );
        optionElement.triggerEventHandler('focus', {
            target: { value: 'test' },
        });
        expect(component.focus.emit).toHaveBeenCalledWith('test');
    });
});
