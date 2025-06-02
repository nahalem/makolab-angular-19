import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { IspButtonComponent } from './isp-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('IspButtonComponent', () => {
    let component: IspButtonComponent;
    let fixture: ComponentFixture<IspButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IspButtonComponent],
            imports: [MatIconModule, MatTooltipModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit onButtonClick event on button click', fakeAsync(() => {
        const onButtonClickSpy = jest.spyOn(component.onButtonClick, 'emit');
        component.disabled = false;
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);
        tick(500); // Wait for delay in onClick method
        expect(onButtonClickSpy).toHaveBeenCalledWith(true);
    }));

    it('should enable the button when disabled is false', () => {
        component.disabled = false;
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.disabled).toBeFalsy(); // !disabled in HTML
    });

    it('should display button with icon and label when isButtonIcon is false', () => {
        component.isButtonIcon = false;
        const matIcon = fixture.debugElement.query(By.css('.button-container'));
        fixture.detectChanges();
        expect(matIcon).toBeTruthy();
    });
});
