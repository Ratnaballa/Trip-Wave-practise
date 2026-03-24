import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DESTINATIONS } from '../destinations-data';
import { Currency } from '../currency';
import { WishlistService } from '../services/wishlist';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist implements OnInit {

  allItems:  any[] = [];
  wishlistItems: any[] = [];
  activeFilter: 'all' | 'india' | 'international' = 'all';
  activeSort:   'default' | 'price-asc' | 'price-desc' | 'rating' = 'default';
  removingId: number | null = null;
  showClearConfirm = false;

  constructor(
    public currencyService: Currency,
    private wishlistService: WishlistService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    const ids = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.allItems = DESTINATIONS.filter(d => ids.includes(d.id));
    this.applyFilterSort();
  }

  applyFilterSort() {
    let list = [...this.allItems];

    // filter
    if (this.activeFilter === 'india')
      list = list.filter(d => d.category === 'india' || d.category === 'domestic');
    else if (this.activeFilter === 'international')
      list = list.filter(d => d.category === 'international');

    // sort
    if (this.activeSort === 'price-asc')
      list.sort((a, b) => a.price - b.price);
    else if (this.activeSort === 'price-desc')
      list.sort((a, b) => b.price - a.price);
    else if (this.activeSort === 'rating')
      list.sort((a, b) => b.rating - a.rating);

    this.wishlistItems = list;
    this.cd.detectChanges();
  }

  setFilter(f: 'all' | 'india' | 'international') {
    this.activeFilter = f;
    this.applyFilterSort();
  }

  setSort(s: 'default' | 'price-asc' | 'price-desc' | 'rating') {
    this.activeSort = s;
    this.applyFilterSort();
  }

  remove(id: number) {
    this.removingId = id;
    setTimeout(() => {
      this.wishlistService.remove(id);
      this.allItems = this.allItems.filter(i => i.id !== id);
      this.applyFilterSort();
      this.removingId = null;
    }, 320);
  }

  clearAll() {
    this.allItems.forEach(i => this.wishlistService.remove(i.id));
    this.allItems = [];
    this.wishlistItems = [];
    this.showClearConfirm = false;
    this.cd.detectChanges();
  }

  stars(n: number) { return Array(n).fill(0); }
  emptyStars(n: number) { return Array(5 - n).fill(0); }

  get indiaCount()  { return this.allItems.filter(d => d.category === 'india' || d.category === 'domestic').length; }
  get intlCount()   { return this.allItems.filter(d => d.category === 'international').length; }
}
