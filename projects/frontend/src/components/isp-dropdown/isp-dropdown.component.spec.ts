import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IspIspDropdownComponent } from './isp-dropdown.component';

describe('IspIspDropdownComponent', () => {
    let component: IspIspDropdownComponent;
    let fixture: ComponentFixture<IspIspDropdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                BrowserAnimationsModule,
            ],
            declarations: [IspIspDropdownComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspIspDropdownComponent);
        component = fixture.componentInstance;

        const formGroup = new FormGroup({
            controlName: new FormControl(),
        });

        component.form = formGroup;
        component.controlName = 'controlName';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call onChange when selectionChanged is called', () => {
        const onChange = jest.fn();
        component.registerOnChange(onChange);
        component.registerOnTouched(jest.fn());
        fixture.detectChanges();
        component.selectionChanged(
            new MatSelectChange(component.selected, {
                value: { value: 'option1', active: true },
            })
        );
        expect(onChange).toHaveBeenCalledWith({
            active: true,
            value: { value: 'option1', active: true },
        });
    });

    it('should call onTouched when selectionChanged is called', () => {
        const onTouched = jest.fn();
        component.registerOnTouched(onTouched);
        component.registerOnChange(jest.fn());
        fixture.detectChanges();
        component.selectionChanged(
            new MatSelectChange(component.selected, {
                value: { value: 'option1', active: true },
            })
        );
        expect(onTouched).toHaveBeenCalled();
    });

    it('should emit selectionChange event when selectionChanged is called', () => {
        const selectionChange = jest.fn();
        component.registerOnChange(jest.fn());
        component.registerOnTouched(jest.fn());
        component.selectionChange.subscribe(selectionChange);
        fixture.detectChanges();
        component.selectionChanged(
            new MatSelectChange(component.selected, {
                value: { value: 'option1', active: true },
            })
        );
        expect(selectionChange).toHaveBeenCalled();
    });

    it('should emit valueChange event when selectionChanged is called', () => {
        const valueChange = jest.fn();
        component.valueChange.subscribe(valueChange);
        component.registerOnChange(jest.fn());
        component.registerOnTouched(jest.fn());
        fixture.detectChanges();
        component.selectionChanged(
            new MatSelectChange(component.selected, {
                value: { value: 'option1', active: true },
            })
        );
        expect(valueChange).toHaveBeenCalled();
    });

    it('should call onChange when change is called', () => {
        const onChange = jest.fn();
        component.registerOnChange(onChange);
        component.registerOnTouched(jest.fn());
        fixture.detectChanges();
        component.change({ value: 'option1', active: true });
        expect(onChange).toHaveBeenCalled();
    });

    it('should call onTouched when change is called', () => {
        const onTouched = jest.fn();
        component.registerOnTouched(onTouched);
        component.registerOnChange(jest.fn());
        fixture.detectChanges();
        component.change({ value: 'option1', active: true });
        expect(onTouched).toHaveBeenCalled();
    });

    it('should emit selectionChange event when change is called', () => {
        const selectionChange = jest.fn();
        component.selectionChange.subscribe(selectionChange);
        component.registerOnChange(jest.fn());
        component.registerOnTouched(jest.fn());
        fixture.detectChanges();
        component.change({ value: 'option1', active: true });
        expect(selectionChange).toHaveBeenCalled();
    });

    it('should emit valueChange event when change is called', () => {
        const valueChange = jest.fn();
        component.valueChange.subscribe(valueChange);
        component.registerOnChange(jest.fn());
        component.registerOnTouched(jest.fn());
        fixture.detectChanges();
        component.change({ value: 'option1', active: true });
        expect(valueChange).toHaveBeenCalled();
    });

    it('should emit selectionChange event when value is null', () => {
        component.registerOnChange(jest.fn());
        component.registerOnTouched(jest.fn());
        const spy = jest.spyOn(component.valueChange, 'emit');
        component.selectionChanged(
            new MatSelectChange(component.selected, {})
        );
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledWith([]);
    });
});
