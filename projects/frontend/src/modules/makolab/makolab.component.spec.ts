import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakolabComponent } from './makolab.component';

describe('MakolabComponent', () => {
  let component: MakolabComponent;
  let fixture: ComponentFixture<MakolabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakolabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakolabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
