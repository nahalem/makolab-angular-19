import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LicensePlateService {
  private readonly digits = 10;
  private readonly letters = 26;

  getPlate(n: number): string {
    // Phase 1: numeric only (000000 - 999999)
    const numericMax = Math.pow(this.digits, 6);
    if (n < numericMax) {
      return n.toString().padStart(6, '0');
    }

    n -= numericMax;

    // Phase 2+: alphanumeric (letters follow digits)
    // Generate suffix like A, B, ..., Z, AA, AB, ..., ZZ, etc.
    const getAlpha = (i: number): string => {
      let result = '';
      do {
        result = String.fromCharCode(65 + (i % this.letters)) + result;
        i = Math.floor(i / this.letters) - 1;
      } while (i >= 0);
      return result;
    };

    // Iterate over suffix sizes (1, 2, 3...)
    let suffixLength = 1;
    while (true) {
      const combinations = this.letters ** suffixLength * (Math.pow(this.digits, 5));
      if (n < combinations) {
        const numericPart = n % Math.pow(this.digits, 5);
        const letterIndex = Math.floor(n / Math.pow(this.digits, 5));
        const letters = getAlpha(letterIndex);
        return numericPart.toString().padStart(5, '0') + letters;
      }
      n -= combinations;
      suffixLength++;
    }
  }
}
