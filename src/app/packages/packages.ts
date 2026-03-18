import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DESTINATIONS } from '../destinations-data';
import { CommonModule } from '@angular/common';
import { Currency } from '../currency';
import { WishlistService } from '../services/wishlist';
@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './packages.html',
  styleUrls: ['./packages.css']
})
export class Packages {
  constructor(
    private router: Router,
    public currencyService: Currency,
    public wishlistService: WishlistService
  ) {}
  packages = DESTINATIONS;
  viewDetails(id: number) {
    this.router.navigate(['/explore', id]);
  }
  filteredPackages = [...this.packages];

  searchText = '';
  selectedCategory = '';
  sortOption = '';

  wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

  applyFilters() {
    let data = [...this.packages];

    // 🔍 search
    if (this.searchText) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // 📂 category
    if (this.selectedCategory) {
      data = data.filter(p => p.category === this.selectedCategory);
    }

    // 🔃 sorting
    if (this.sortOption === 'priceLow') {
      data.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'priceHigh') {
      data.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'rating') {
      data.sort((a, b) => b.rating - a.rating);
    }

    this.filteredPackages = data;
  }

  // ❤️ wishlist
  toggleWishlist(pkg: any) {
    if (this.wishlist.includes(pkg.id)) {
      this.wishlist = this.wishlist.filter(id => id !== pkg.id);
    } else {
      this.wishlist.push(pkg.id);
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  isWishlisted(id: number) {
    return this.wishlist.includes(id);
  }
}