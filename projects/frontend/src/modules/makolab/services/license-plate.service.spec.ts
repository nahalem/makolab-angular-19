import { TestBed } from '@angular/core/testing';

import { LicensePlateService } from './license-plate.service';

describe('LicensePlateService', () => {
  let service: LicensePlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicensePlateService);
  });

  it('should generate correct plate for index 0', () => {
    expect(service.getPlate(0)).toBe('000000');
  });

  it('should generate unique plates for different indexes', () => {
    expect(service.getPlate(1)).not.toBe(service.getPlate(2));
  });
});
