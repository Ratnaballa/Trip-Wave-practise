import { Pipe, PipeTransform } from '@angular/core';
import { BookingRecord } from './booking.service';

@Pipe({ name: 'completedCount', standalone: true })
export class CompletedCountPipe implements PipeTransform {
  transform(bookings: BookingRecord[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookings.filter(b => new Date(b.date) < today).length;
  }
}
