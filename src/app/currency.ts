import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Currency {
  getCurrencySymbol(category?: string): string {
    return category == 'international' ? '$' : '₹';
  }

  convertPrice(price: number, category?: string): number {
    if (category == 'international') {
      return Math.round(price / 83);
    }
    return price;
  }
}
