import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  destinations = [
    { id: 12, name: 'Maldives', country: 'Indian Ocean', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', description: 'Crystal clear waters and overwater bungalows in paradise.', rating: 5, tag: 'Beach', featured: true },
    { id: 13, name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34', description: 'The city of love, art, and iconic landmarks.', rating: 4, tag: 'Culture', featured: false },
    { id: 32, name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', description: 'Tropical paradise with lush rice terraces and beaches.', rating: 5, tag: 'Tropical', featured: false },
    { id: 11, name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad', description: 'Futuristic skyline, luxury shopping, and desert adventures.', rating: 4, tag: 'Luxury', featured: false },
    { id: 14, name: 'Switzerland', country: 'Europe', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', description: 'Majestic Alps, pristine lakes, and charming villages.', rating: 5, tag: 'Mountains', featured: false }
  ];

  stats = [
    { num: '50K+', label: 'Happy Travelers' },
    { num: '120+', label: 'Destinations' },
    { num: '4.9★', label: 'Average Rating' },
    { num: '24/7', label: 'Support' }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
