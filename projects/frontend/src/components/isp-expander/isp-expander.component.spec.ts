import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { IspExpanderComponent } from './isp-expander.component';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

describe('IspExpanderComponent', () => {
    let component: IspExpanderComponent;
    let fixture: ComponentFixture<IspExpanderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IspExpanderComponent],
            imports: [
                MatIconModule,
                MatTooltipModule,
                MatChipsModule,
                CommonModule,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspExpanderComponent);
        component = fixture.componentInstance;
        component.data = ['test'];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit isExpaned event when expander is expanded or collapsed', () => {
        jest.spyOn(component.isExpaned, 'emit');

        const expander = fixture.debugElement.query(By.css('span'));
        expander.triggerEventHandler('click', null);
        expect(component.expanded).toBeTruthy();
        expect(component.isExpaned.emit).toHaveBeenCalledWith(true);

        expander.triggerEventHandler('click', null);
        expect(component.expanded).toBeFalsy();
        expect(component.isExpaned.emit).toHaveBeenCalledWith(false);
    });

    it('should show chips when expander is clicked', () => {
        const expander = fixture.debugElement.query(By.css('span'));
        expander.triggerEventHandler('click', null);
        fixture.detectChanges();
        const chips = fixture.debugElement.query(By.css('mat-chip-list'));
        expect(chips).toBeTruthy();
    });
});
