import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookingService, BookingRecord } from '../services/booking.service';
import { Currency } from '../currency';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-success.html',
  styleUrls: ['./booking-success.css']
})
export class BookingSuccess implements OnInit {
  booking: BookingRecord | null = null;
  bookingRef = '';

  constructor(
    private bookingService: BookingService,
    public currencyService: Currency,
    private router: Router,
    public ticketService: TicketService
  ) {}

  ngOnInit() {
    const all = this.bookingService.getAll();
    this.booking = all[all.length - 1] ?? null;
    if (!this.booking) { this.router.navigate(['/home']); return; }
    this.bookingRef = 'TW' + this.booking.id.toString().slice(-8).toUpperCase();
  }

  downloadTicket() {
    if (this.booking) this.ticketService.download(this.booking);
  }
}
