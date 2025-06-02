import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IspIconComponent } from './isp-icon.component';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('IspIconComponent', () => {
    let component: IspIconComponent;
    let fixture: ComponentFixture<IspIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatIconModule, BrowserAnimationsModule, MatTooltipModule],
            declarations: [IspIconComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspIconComponent);
        component = fixture.componentInstance;
        component.iconName = 'Add';
        component.toolTip = 'Add Item';
        component.url = 'https://www.example.com';
        fixture.detectChanges();
    });

    it('should show icon with correct name when iconName is set', () => {
        const icon = fixture.debugElement.query(By.css('.mat-icon'));
        expect(icon).toBeTruthy();
        expect(icon.nativeElement.textContent).toContain('Add');
    });

    it('should call onClick method when icon is clicked', () => {
        jest.spyOn(component, 'onClick');
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('mat-icon');
        icon.click();
        expect(component.onClick).toHaveBeenCalled();
    });

    it('should show link when url is set', () => {
        const link = fixture.nativeElement.querySelector('a');
        expect(link).toBeTruthy();
    });

    it('should show icon with link when url is set', () => {
        fixture.detectChanges();
        const icon = fixture.nativeElement.querySelector('a mat-icon');
        expect(icon.textContent).toContain('Add');
    });
});
