import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IspTextareaComponent } from './isp-textarea.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('IspTextareaComponent', () => {
    let component: IspTextareaComponent;
    let fixture: ComponentFixture<IspTextareaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IspTextareaComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatFormFieldModule,
                MatInputModule,
                NoopAnimationsModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspTextareaComponent);
        component = fixture.componentInstance;
        component.controlName = 'textareaControl';
        component.readonly = true;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with the provided control name', () => {
        component.ngOnInit();

        expect(component.form.controls['textareaControl']).toBeTruthy();
    });

    it('should set the form value when the component value changes', () => {
        component.ngOnInit();

        const textareaElement = fixture.debugElement.query(
            By.css('textarea')
        ).nativeElement;
        textareaElement.value = 'Test value';
        textareaElement.dispatchEvent(new Event('input'));

        expect(component.form.controls['textareaControl'].value).toBe(
            'Test value'
        );
    });

    it('should disable the form control when readonly is true', () => {
        fixture.detectChanges();
        component.ngOnInit();

        expect(component.form.controls['textareaControl'].disabled).toBe(true);
    });

    it('should emit empty value when the component value has only white spaces', () => {
      component.ngOnInit();

      const textareaElement = fixture.debugElement.query(
        By.css('textarea')
      ).nativeElement;
      textareaElement.value = '    ';
      component.onChange = jest.fn();
      component.onValueCheck(textareaElement.value);
      fixture.detectChanges();
      textareaElement.dispatchEvent(new Event('input'));
      expect(component.form.controls['textareaControl'].value).toBe('');
    });
});
