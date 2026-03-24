import { Injectable } from '@angular/core';

export interface BookingRecord {
  id: number;
  destinationId: number;
  destination: string;
  image: string;
  price: number;
  category: string;
  total: number;
  basePrice?: number;
  roomSurcharge?: number;
  subtotal?: number;
  taxes?: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  people: number;
  days: number;
  roomType: string;
  notes?: string;
  userEmail: string;   // ← links booking to logged-in user
}

const KEY            = 'bookings';
const CANCELLED_KEY  = 'cancelled_bookings';

export interface CancelledRecord extends BookingRecord {
  cancelledAt: string;   // ISO date string
}

@Injectable({ providedIn: 'root' })
export class BookingService {

  getAll(): BookingRecord[] {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || '[]');
      const list = Array.isArray(data) ? data : [];
      console.log(`[BookingService] getAll() → ${list.length} total booking(s)`);
      return list;
    } catch {
      console.error('[BookingService] Failed to parse bookings from localStorage.');
      return [];
    }
  }

  /** Returns only bookings belonging to the given email */
  getByUser(email: string): BookingRecord[] {
    const all = this.getAll();
    const filtered = all.filter(b => b.userEmail === email);
    console.log(`[BookingService] getByUser(${email}) → ${filtered.length} booking(s)`);
    return filtered;
  }

  save(booking: BookingRecord): void {
    const existing = this.getAll();
    existing.push(booking);
    localStorage.setItem(KEY, JSON.stringify(existing));
    console.log(`[BookingService] Saved booking #${booking.id} for "${booking.destination}" | user: ${booking.userEmail}`);
  }

  cancel(id: number): void {
    const all     = this.getAll();
    const target  = all.find(b => b.id === id);
    if (target) this.saveCancelled(target);
    const updated = all.filter(b => b.id !== id);
    localStorage.setItem(KEY, JSON.stringify(updated));
    console.log(`[BookingService] Cancelled booking #${id}. Remaining: ${updated.length}`);
  }

  saveCancelled(booking: BookingRecord): void {
    const list: CancelledRecord[] = this.getCancelledByUser(booking.userEmail);
    const others = this.getAllCancelled().filter(b => b.userEmail !== booking.userEmail);
    const record: CancelledRecord = { ...booking, cancelledAt: new Date().toISOString() };
    localStorage.setItem(CANCELLED_KEY, JSON.stringify([...others, ...list, record]));
    console.log(`[BookingService] Stored cancelled booking #${booking.id} for ${booking.userEmail}`);
  }

  getAllCancelled(): CancelledRecord[] {
    try {
      const data = JSON.parse(localStorage.getItem(CANCELLED_KEY) || '[]');
      return Array.isArray(data) ? data : [];
    } catch { return []; }
  }

  getCancelledByUser(email: string): CancelledRecord[] {
    const list = this.getAllCancelled().filter(b => b.userEmail === email);
    console.log(`[BookingService] getCancelledByUser(${email}) → ${list.length} cancelled`);
    return list;
  }
}
