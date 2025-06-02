import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcurrencyExcerciseComponent } from './concurrency-excercise.component';

describe('ConcurrencyExcerciseComponent', () => {
  let component: ConcurrencyExcerciseComponent;
  let fixture: ComponentFixture<ConcurrencyExcerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcurrencyExcerciseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcurrencyExcerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
