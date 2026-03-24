import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';
import { Currency } from '../currency';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class Payment implements OnInit {
  booking: any = null;
  paymentMethod: 'card' | 'upi' | 'netbanking' = 'card';
  isProcessing = false;
  cardForm!: FormGroup;
  upiForm!: FormGroup;

  banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank'];
  selectedBank = '';

  get f() { return this.cardForm.controls; }
  get u() { return this.upiForm.controls; }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bookingService: BookingService,
    public currencyService: Currency,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const raw = localStorage.getItem('pendingBooking');
    if (!raw) { this.router.navigate(['/destinations']); return; }
    this.booking = JSON.parse(raw);

    this.cardForm = this.fb.group({
      cardName:   ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry:     ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv:        ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
    });

    this.upiForm = this.fb.group({
      upiId: ['', [Validators.required, Validators.pattern(/^[\w.\-]+@[\w]+$/)]]
    });
  }

  setMethod(m: 'card' | 'upi' | 'netbanking') {
    this.paymentMethod = m;
  }

  formatCard(e: any) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 16);
    e.target.value = v.match(/.{1,4}/g)?.join(' ') || v;
    this.cardForm.patchValue({ cardNumber: v });
  }

  formatExpiry(e: any) {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
    e.target.value = v;
    this.cardForm.patchValue({ expiry: v });
  }

  get isFormValid(): boolean {
    if (this.paymentMethod === 'card')       return this.cardForm.valid;
    if (this.paymentMethod === 'upi')        return this.upiForm.valid;
    if (this.paymentMethod === 'netbanking') return !!this.selectedBank;
    return false;
  }

  pay() {
    if (!this.isFormValid) {
      if (this.paymentMethod === 'card') this.cardForm.markAllAsTouched();
      if (this.paymentMethod === 'upi')  this.upiForm.markAllAsTouched();
      return;
    }
    this.isProcessing = true;
    setTimeout(() => {
      const record = {
        ...this.booking,
        userEmail: this.booking.userEmail || this.auth.getUserEmail()
      };
      console.log('[Payment] Saving booking for user:', record.userEmail);
      this.bookingService.save(record);
      localStorage.removeItem('pendingBooking');
      this.router.navigate(['/booking-success']);
    }, 2200);
  }
}
