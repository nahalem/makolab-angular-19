import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConcurrentFetchService } from './concurrent-fetch.service';

describe('ConcurrentFetchService', () => {
  let service: ConcurrentFetchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(ConcurrentFetchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch URLs with concurrency limit', async () => {
    const urls = ['url1', 'url2'];
    service.fetchWithConcurrency(urls, 1).then(response => {
      expect(response.length).toBe(2);
    });
    urls.forEach(url => httpMock.expectOne(url).flush({ url }));
  });
});
