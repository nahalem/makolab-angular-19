import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensePlateProblemComponent } from './license-plate-problem.component';
import { FormsModule } from '@angular/forms';
import { LicensePlateService } from '../../services/license-plate.service';

describe('LicensePlateComponent', () => {
  let component: LicensePlateProblemComponent;
  let fixture: ComponentFixture<LicensePlateProblemComponent>;
  let service: jasmine.SpyObj<LicensePlateService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('LicensePlateService', ['getPlate']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LicensePlateProblemComponent],
      providers: [
        { provide: LicensePlateService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(LicensePlateProblemComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LicensePlateService) as jasmine.SpyObj<LicensePlateService>;
  });

  it('should display generated plate', () => {
    service.getPlate.and.returnValue('000123');
    component.index = 123;
    component.getPlate();
    expect(component.plate).toBe('000123');
    expect(service.getPlate).toHaveBeenCalledWith(123);
  });
});
