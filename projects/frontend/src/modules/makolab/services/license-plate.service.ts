import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LicensePlateService {
  getPlate(index: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const base = chars.length;

    const pad = (s: string, len: number) => s.padStart(6, '0');

    let result = '';
    let i = index;
    while (i > 0) {
      result = chars[i % base] + result;
      i = Math.floor(i / base);
    }
    return pad(result, 6);
  }
}
