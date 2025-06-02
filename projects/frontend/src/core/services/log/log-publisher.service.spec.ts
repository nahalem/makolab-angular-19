import { TestBed } from '@angular/core/testing';

import { LogPublisherService } from './log-publisher.service';

describe('PublisherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogPublisherService = TestBed.get(LogPublisherService);
    expect(service).toBeTruthy();
  });
});
