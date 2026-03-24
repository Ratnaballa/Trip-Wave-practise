import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookingService, BookingRecord, CancelledRecord } from '../services/booking.service';
import { Currency } from '../currency';
import { CompletedCountPipe } from '../services/completed-count.pipe';
import { TicketService } from '../services/ticket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, CompletedCountPipe],
  templateUrl: './my-bookings.html',
  styleUrls: ['./my-bookings.css']
})
export class MyBookings implements OnInit {
  bookings: BookingRecord[]           = [];
  cancelledBookings: CancelledRecord[] = [];
  cancellingId: number | null = null;
  showCancelToast = false;
  userName = '';
  showCancelledSection = false;

  constructor(
    private bookingService: BookingService,
    public currencyService: Currency,
    private router: Router,
    public ticketService: TicketService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();
    if (!user) {
      console.warn('[MyBookings] No user session — redirecting to /login');
      this.router.navigate(['/login']);
      return;
    }
    this.userName = user.name;
    this.loadBookings();
  }

  loadBookings() {
    const email = this.auth.getUserEmail();
    this.bookings          = this.bookingService.getByUser(email).reverse();
    this.cancelledBookings = this.bookingService.getCancelledByUser(email).reverse();
    console.log(`[MyBookings] Showing ${this.bookings.length} active, ${this.cancelledBookings.length} cancelled for ${email}`);
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

  formatCancelDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
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
