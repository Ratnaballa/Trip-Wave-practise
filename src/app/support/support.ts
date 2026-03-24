import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './support.html',
  styleUrls: ['./support.css']
})
export class Support {
  faqs = [
    { q: 'How do I cancel a booking?',          a: 'Go to My Bookings and click "Cancel Booking" on the trip you want to cancel.', open: false },
    { q: 'Can I modify my booking date?',        a: 'Currently, you can cancel and re-book with the new date. Modification feature is coming soon.', open: false },
    { q: 'How is the total price calculated?',   a: 'Total = (Base price + Room surcharge) × People × Nights + 5% taxes.', open: false },
    { q: 'Are international prices in USD?',     a: 'Yes, international destination prices are displayed in USD.', open: false },
    { q: 'How do I add a destination to wishlist?', a: 'Click the heart icon on any destination card to add it to your wishlist.', open: false },
  ];

  toggle(faq: any) { faq.open = !faq.open; }
}
