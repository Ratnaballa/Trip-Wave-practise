import { Injectable } from '@angular/core';

export interface BookingRecord {
  id: number;
  destinationId: number;
  destination: string;
  image: string;
  price: number;
  category: string;
  total: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  people: number;
  days: number;
  roomType: string;
  notes?: string;
}

const STORAGE_KEY = 'bookings';

@Injectable({ providedIn: 'root' })
export class BookingService {

  getAll(): BookingRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = JSON.parse(raw || '[]');
      console.log(`[BookingService] Loaded ${data.length} booking(s) from localStorage.`);
      return Array.isArray(data) ? data : [];
    } catch {
      console.error('[BookingService] Failed to parse bookings from localStorage.');
      return [];
    }
  }

  save(booking: BookingRecord): void {
    const existing = this.getAll();
    existing.push(booking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log(`[BookingService] Saved booking #${booking.id} for "${booking.destination}". Total: ${existing.length}`);
  }

  cancel(id: number): void {
    const updated = this.getAll().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log(`[BookingService] Cancelled booking #${id}. Remaining: ${updated.length}`);
  }
}
