import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './offers.html',
  styleUrls: ['./offers.css']
})
export class Offers {
  offers = [
    { icon: '🏖️', title: 'Summer Escape',      desc: 'Up to 30% off on beach destinations',        code: 'SUMMER30',  expiry: '31 Aug 2025', color: '#0ea5e9' },
    { icon: '🏔️', title: 'Mountain Retreat',   desc: 'Flat ₹2000 off on hill station bookings',    code: 'HILLS2K',   expiry: '30 Sep 2025', color: '#22c55e' },
    { icon: '🌍', title: 'International Deal', desc: '20% off on all international packages',       code: 'WORLD20',   expiry: '15 Oct 2025', color: '#f59e0b' },
    { icon: '👨‍👩‍👧', title: 'Family Pack',       desc: 'Special rates for groups of 4 or more',      code: 'FAMILY4',   expiry: '31 Dec 2025', color: '#8b5cf6' },
    { icon: '🌙', title: 'Long Stay Bonus',    desc: 'Extra 10% off for stays of 7+ nights',       code: 'STAY7',     expiry: '31 Dec 2025', color: '#ef4444' },
    { icon: '⚡', title: 'Flash Sale',          desc: 'Limited time: 40% off select destinations',  code: 'FLASH40',   expiry: '7 Jul 2025',  color: '#0a1f44' },
  ];

  copied: string | null = null;

  copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    this.copied = code;
    setTimeout(() => this.copied = null, 2000);
  }
}
