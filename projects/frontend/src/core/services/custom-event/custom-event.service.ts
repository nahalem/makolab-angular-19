import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CustomEventService {
    constructor() {}

    public createEvent(document: Document, eventId: string, data: any) {
        let event: CustomEvent;
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventId, true, true, { data });
        document.dispatchEvent(event);
    }
}
