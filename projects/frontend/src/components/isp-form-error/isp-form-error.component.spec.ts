import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { IspFormErrorComponent } from './isp-form-error.component';

describe('IspFormErrorComponent', () => {
    let component: IspFormErrorComponent;
    let fixture: ComponentFixture<IspFormErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [IspFormErrorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspFormErrorComponent);
        component = fixture.componentInstance;
        component.form = new FormGroup({
            inputField: new FormControl('', Validators.required),
        });
        component.controlName = 'inputField';
        component.title = 'Input Field';
        fixture.detectChanges();
    });

    it('should show error message when input field is empty', () => {
        component.form.get('inputField').setValue('');
        fixture.detectChanges();
        const errorMessage = fixture.nativeElement.querySelector('span');
        expect(errorMessage.textContent).toContain('Input Field is required!');
    });
});
