import { TestBed } from '@angular/core/testing';

import { NotificationService } from './custom-event.service';

describe('NotificationService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: NotificationService = TestBed.get(NotificationService);
        expect(service).toBeTruthy();
    });
});
