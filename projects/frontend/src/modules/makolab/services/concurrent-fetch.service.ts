import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, lastValueFrom, mergeMap, toArray } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConcurrentFetchService {
  constructor(private http: HttpClient) {}

  async fetchWithConcurrency(urls: string[], maxConcurrency: number): Promise<any[]> {
    const fetch$ = from(urls).pipe(
      mergeMap(url => this.http.get(url), maxConcurrency),
      toArray()
    );
    return await lastValueFrom(fetch$);
  }
}

