import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspDatepickerComponent } from './isp-datepicker.component';

describe('IspDatepickerComponent', () => {
  let component: IspDatepickerComponent;
  let fixture: ComponentFixture<IspDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IspDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IspDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
