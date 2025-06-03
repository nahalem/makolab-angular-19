import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, lastValueFrom, mergeMap, toArray } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConcurrentFetchService {
  constructor(private http: HttpClient) {}

  async fetchWithConcurrency(urls: string[], maxConcurrency: number): Promise<any[]> {
    const limitedUrls = urls.slice(0, maxConcurrency);

    const results: any[] = [];
    const queue = [...limitedUrls];
    const workers: Promise<void>[] = [];

    const fetchNext = async () => {
      while (queue.length) {
        const url = queue.shift();
        if (!url) return;
        try {
          const res = await this.http.get(url).toPromise();
          results.push(res);
        } catch (e) {
          results.push({ error: true, url });
        }
      }
    };

    for (let i = 0; i < maxConcurrency; i++) {
      workers.push(fetchNext());
    }

    await Promise.all(workers);
    return results;
  }
}

