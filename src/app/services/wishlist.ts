import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

  private wishlistCount = new BehaviorSubject<number>(this.wishlist.length);

  wishlistCount$ = this.wishlistCount.asObservable();

  toggle(id: number) {
    if (this.wishlist.includes(id)) {
      this.wishlist = this.wishlist.filter((i: number) => i !== id);
    } else {
      this.wishlist.push(id);
    }

    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    console.log("Updated wishlist:", this.wishlist);
    this.wishlistCount.next(this.wishlist.length);
  }

  isWishlisted(id: number) {
    return this.wishlist.includes(id);
  }
  remove(id: number) {
  this.wishlist = this.wishlist.filter((i: number) => i !== id);

  localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

  this.wishlistCount.next([...this.wishlist].length);
}
}