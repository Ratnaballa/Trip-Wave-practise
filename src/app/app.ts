import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistService } from './services/wishlist';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  
})
export class App implements OnInit {

  wishlistCount = 0;
  isSidebarOpen = false;

  constructor(
    private wishlistService: WishlistService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.wishlistService.wishlistCount$.subscribe(count => {
      console.log("Navbar count updated:", count);
      this.wishlistCount = count;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  signOut() {
    console.log('User signed out');
    this.isSidebarOpen = false;
    this.router.navigate(['/home']);
  }

}