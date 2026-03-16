import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  // Sidebar State
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  destinations = [
    {
      id: 12,
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      description: 'Crystal clear waters and luxury resorts.',
      rating: 5
    },
    {
      id: 13,
      name: 'Paris',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      description: 'The city of love and iconic landmarks.',
      rating: 4
    },
    {
      id: 32,
      name: 'Bali',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      description: 'Tropical paradise with stunning beaches.',
      rating: 5
    },
    {
      id: 11,
      name: 'Dubai',
      image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
      description: 'Luxury lifestyle and modern architecture.',
      rating: 4
    },
    {
      id: 14,
      name: 'Switzerland',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
      description: 'Snowy mountains and scenic landscapes.',
      rating: 5
    }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}