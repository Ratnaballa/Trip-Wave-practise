import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DESTINATIONS } from '../destinations-data';
import { CommonModule } from '@angular/common';
import { Currency } from '../currency';
import { WishlistService } from '../services/wishlist';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './packages.html',
  styleUrls: ['./packages.css']
})
export class Packages implements OnInit {
  constructor(
    private router: Router,
    public currencyService: Currency,
    public wishlistService: WishlistService
  ) {}

  packages = DESTINATIONS;
  filteredPackages = [...this.packages];

  searchText = '';
  selectedCategory = '';
  sortOption = '';

  stats = { total: 0, india: 0, international: 0, wishlisted: 0 };

  ngOnInit() {
    this.stats = {
      total: this.packages.length,
      india: this.packages.filter(p => p.category === 'india' || p.category === 'domestic').length,
      international: this.packages.filter(p => p.category === 'international').length,
      wishlisted: JSON.parse(localStorage.getItem('wishlist') || '[]').length
    };
  }

  applyFilters() {
    let data = [...this.packages];
    if (this.searchText)
      data = data.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        p.description?.toLowerCase().includes(this.searchText.toLowerCase()));
    if (this.selectedCategory)
      data = data.filter(p => p.category === this.selectedCategory);
    if (this.sortOption === 'priceLow')  data.sort((a, b) => a.price - b.price);
    if (this.sortOption === 'priceHigh') data.sort((a, b) => b.price - a.price);
    if (this.sortOption === 'rating')    data.sort((a, b) => b.rating - a.rating);
    if (this.sortOption === 'name')      data.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredPackages = data;
  }

  resetFilters() {
    this.searchText = '';
    this.selectedCategory = '';
    this.sortOption = '';
    this.filteredPackages = [...this.packages];
  }

  viewDetails(id: number) { this.router.navigate(['/explore', id]); }
  bookNow(id: number)     { this.router.navigate(['/bookings', id]); }

  getRatingStars(rating: number): number[] { return Array(Math.floor(rating)).fill(0); }
  getRatingWidth(rating: number): number   { return (rating / 5) * 100; }
}
