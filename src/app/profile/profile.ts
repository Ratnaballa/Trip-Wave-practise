import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  name  = '';
  email = '';
  initial = '';
  bookingCount = 0;
  memberSince = '';

  constructor(private auth: AuthService, private bookingService: BookingService) {}

  ngOnInit() {
    const user = this.auth.getUser();
    if (user) {
      this.name    = user.name;
      this.email   = user.email;
      this.initial = user.name.charAt(0).toUpperCase();
      this.bookingCount = this.bookingService.getByUser(user.email).length;
    }
    this.memberSince = new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  }
}
