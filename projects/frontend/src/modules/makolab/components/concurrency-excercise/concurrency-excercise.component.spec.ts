// concurrent-fetch.component.spec.ts (testy integracyjne z realnym fetch)
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConcurrentFetchService } from '../../services/concurrent-fetch.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ConcurrentExcerciseComponent } from './concurrency-excercise.component';

describe('ConcurrentExcerciseComponent - integration', () => {
  let component: ConcurrentExcerciseComponent;
  let fixture: ComponentFixture<ConcurrentExcerciseComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConcurrentExcerciseComponent],
      imports: [HttpClientTestingModule],
      providers: [ConcurrentFetchService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcurrentExcerciseComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all URLs with concurrency limit', async () => {
    component.maxConcurrency = 2;
    component.urls = ['https://api.test/1', 'https://api.test/2', 'https://api.test/3'];
    const runPromise = component.run();

    const reqs = httpMock.match(() => true);
    expect(reqs.length).toBe(2); // maxConcurrency == 2

    reqs.forEach(req => {
      expect(['https://api.test/1', 'https://api.test/2']).toContain(req.request.url);
      req.flush({ ok: true, url: req.request.url });
    });

    const next = httpMock.expectOne('https://api.test/3');
    next.flush({ ok: true, url: 'https://api.test/3' });

    await runPromise;
    expect(component.responses.length).toBe(3);
    expect(component.responses[0].ok).toBeTrue();
  });

  it('should update view with responses', async () => {
    component.urls = ['https://api.test/a'];
    const runPromise = component.run();

    const req = httpMock.expectOne('https://api.test/a');
    req.flush({ message: 'hello' });

    await runPromise;
    fixture.detectChanges();

    const pre = fixture.debugElement.query(By.css('pre')).nativeElement;
    expect(pre.textContent).toContain('hello');
  });
});
