import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IspLabelComponent } from './isp-label.component';

describe('IspLabelComponent', () => {
    let component: IspLabelComponent;
    let fixture: ComponentFixture<IspLabelComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IspLabelComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IspLabelComponent);
        component = fixture.componentInstance;
        component.label = 'Test Label';
        component.asALink = true;
        component.url = 'https://example.com';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display label text', () => {
        const labelElement = fixture.debugElement.query(By.css('label'));
        expect(labelElement.nativeElement.textContent).toContain('Test Label');
    });

    it('should display label as a link', () => {
        const linkElement = fixture.debugElement.query(By.css('a'));
        expect(linkElement.nativeElement.textContent).toContain('Test Label ');
        expect(linkElement.nativeElement.getAttribute('href')).toBe(
            'https://example.com'
        );
    });
});
