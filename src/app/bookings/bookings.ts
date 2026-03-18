import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DESTINATIONS } from '../destinations-data';
import { Currency } from '../currency';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class Booking {
  destination: any;
  name = '';
  date = '';
  people = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public currencyService: Currency
  ) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.destination = DESTINATIONS.find(d => d.id === id);
  }
  confirmBooking() {
    const bookingData = {
      id: Date.now(),
      destination: this.destination.name,
      image: this.destination.image,
      price: this.destination.price,
      category: this.destination.category,
      date: this.date,
      people: this.people
    };
    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    existing.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(existing));
    this.router.navigate(['/my-bookings']);
  }
}