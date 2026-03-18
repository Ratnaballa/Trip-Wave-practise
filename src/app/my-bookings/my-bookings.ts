import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookingService, BookingRecord } from '../services/booking.service';
import { Currency } from '../currency';
import { CompletedCountPipe } from '../services/completed-count.pipe';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, CompletedCountPipe],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookings implements OnInit {
  bookings: BookingRecord[] = [];
  cancellingId: number | null = null;
  showCancelToast = false;

  constructor(
    private bookingService: BookingService,
    public currencyService: Currency,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.bookings = this.bookingService.getAll().reverse(); // newest first
  }

  cancelBooking(id: number) {
    this.cancellingId = id;
    setTimeout(() => {
      this.bookingService.cancel(id);
      this.loadBookings();
      this.cancellingId = null;
      this.showCancelToast = true;
      setTimeout(() => this.showCancelToast = false, 3000);
    }, 150);
  }

  goBook() {
    this.router.navigate(['/destinations']);
  }

  getStatusLabel(date: string): { label: string; cls: string } {
    const travel = new Date(date);
    const today  = new Date();
    today.setHours(0, 0, 0, 0);
    if (travel < today) return { label: 'Completed',  cls: 'status-done' };
    const diff = Math.ceil((travel.getTime() - today.getTime()) / 86400000);
    if (diff <= 7)      return { label: `In ${diff}d`, cls: 'status-soon' };
    return               { label: 'Upcoming',   cls: 'status-upcoming' };
  }
}
