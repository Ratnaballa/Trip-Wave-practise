import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DESTINATIONS } from '../destinations-data';
import { Currency } from '../currency';
import { WishlistService } from '../services/wishlist';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {

  constructor(public currencyService: Currency,
    private wishlistService: WishlistService,
    private cd: ChangeDetectorRef
  ) {}
  wishlistIds: number[] = [];
  wishlistItems: any[] = [];

  ngOnInit() {
    this.wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');

    this.wishlistItems = DESTINATIONS.filter(d =>
      this.wishlistIds.includes(d.id)
    );
  }
  remove(id: number) {
  this.wishlistService.remove(id);
  this.wishlistItems = this.wishlistItems.filter(i => i.id !== id);
  this.cd.detectChanges(); 
}
}