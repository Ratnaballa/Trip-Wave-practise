import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DESTINATIONS } from '../destinations-data';
import { Currency } from '../currency';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class Booking implements OnInit {
  destination: any;
  bookingForm!: FormGroup;
  isSubmitting = false;
  showModal = false;
  showToast = false;
  minDate = new Date().toISOString().split('T')[0];

  get f() { return this.bookingForm.controls; }

  get basePrice(): number {
    if (!this.destination) return 0;
    return this.currencyService.convertPrice(this.destination.price, this.destination.category);
  }

  get people(): number  { return Number(this.f['people'].value) || 1; }
  get days(): number    { return Number(this.f['days'].value) || 1; }
  get roomType(): string { return this.f['roomType'].value || ''; }

  get roomSurcharge(): number {
    if (this.roomType === 'Deluxe') return Math.round(this.basePrice * 0.25);
    if (this.roomType === 'Luxury') return Math.round(this.basePrice * 0.60);
    return 0;
  }

  get subtotal(): number  { return (this.basePrice + this.roomSurcharge) * this.people * this.days; }
  get taxes(): number     { return Math.round(this.subtotal * 0.05); }
  get totalPrice(): number { return this.subtotal + this.taxes; }

  get formProgress(): number {
    const fields = ['name', 'email', 'phone', 'date', 'people', 'days', 'roomType'];
    const valid = fields.filter(f => this.bookingForm?.get(f)?.valid).length;
    return Math.round((valid / fields.length) * 100);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public currencyService: Currency,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.destination = DESTINATIONS.find(d => d.id === id);

    this.bookingForm = this.fb.group({
      name:     ['', [Validators.required, Validators.minLength(3)]],
      email:    ['', [Validators.required, Validators.email]],
      phone:    ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      date:     ['', Validators.required],
      people:   [1,  [Validators.required, Validators.min(1), Validators.max(20)]],
      days:     [1,  [Validators.required, Validators.min(1), Validators.max(30)]],
      roomType: ['', Validators.required],
      notes:    ['']
    });
  }

  selectRoom(type: string) {
    this.bookingForm.patchValue({ roomType: type });
    this.f['roomType'].markAsTouched();
  }

  // Step 1: validate → open modal
  confirmBooking() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    this.showModal = true;
  }

  // Step 2: modal confirmed → save + toast + redirect
  proceedBooking() {
    this.showModal = false;
    this.isSubmitting = true;
    setTimeout(() => {
      const v = this.bookingForm.value;
      this.bookingService.save({
        id: Date.now(),
        destinationId: this.destination.id,
        destination: this.destination.name,
        image: this.destination.image,
        price: this.destination.price,
        category: this.destination.category,
        total: this.totalPrice,
        ...v
      });
      this.isSubmitting = false;
      this.showToast = true;
      setTimeout(() => this.router.navigate(['/my-bookings']), 2000);
    }, 1400);
  }

  cancelModal() { this.showModal = false; }
}
