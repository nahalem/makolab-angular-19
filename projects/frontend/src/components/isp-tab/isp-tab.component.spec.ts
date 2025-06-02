import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { IspTabComponent } from './isp-tab.component';
import { FormsModule } from '@angular/forms';
import { FormMode } from '@app/core/enums/form-mode.enum';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('IspTabComponent', () => {
    let component: IspTabComponent;
    let fixture: ComponentFixture<IspTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatTabsModule, FormsModule, NoopAnimationsModule],
            declarations: [IspTabComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize selected FormControl with value 0', () => {
        expect(component.selected.value).toBe(0);
    });

    it('should display the correct number of mat-tabs based on tabsDefinition', () => {
        component.tabsDefinition = [
            { title: 'Tab 1', selectedIndex: 0, formMode: FormMode.NEW },
            { title: 'Tab 2', selectedIndex: 1, formMode: FormMode.NEW },
            { title: 'Tab 3', selectedIndex: 2, formMode: FormMode.NEW },
        ];
        fixture.detectChanges();
        const tabLabels =
            fixture.nativeElement.querySelectorAll('.mat-tab-label');
        expect(tabLabels.length).toBe(3);
    });

    it('should display the correct label for each mat-tab', () => {
        component.tabsDefinition = [
            { title: 'Tab 1', selectedIndex: 0, formMode: FormMode.NEW },
            { title: 'Tab 2', selectedIndex: 1, formMode: FormMode.NEW },
            { title: 'Tab 3', selectedIndex: 2, formMode: FormMode.NEW },
        ];
        fixture.detectChanges();
        const tabLabels =
            fixture.nativeElement.querySelectorAll('.mat-tab-label');
        expect(tabLabels[0].textContent).toBe('Tab 1');
        expect(tabLabels[1].textContent).toBe('Tab 2');
        expect(tabLabels[2].textContent).toBe('Tab 3');
    });

    it('should emit onTabChange event when tab is changed', () => {
        jest.spyOn(component, 'onTabChange');
        const tabGroup = fixture.nativeElement.querySelector('mat-tab-group');
        tabGroup.selectedIndex = 1;
        tabGroup.dispatchEvent(new Event('selectedTabChange'));
        expect(component.onTabChange).toHaveBeenCalled();
    });
});
