import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensePlateProblemComponent } from './license-plate-problem.component';

describe('LicensePlateProblemComponent', () => {
  let component: LicensePlateProblemComponent;
  let fixture: ComponentFixture<LicensePlateProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicensePlateProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensePlateProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
