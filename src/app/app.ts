import { Component, OnInit, effect } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistService } from './services/wishlist';
import { AuthService } from './services/auth.service';
import { ThemeService, Theme } from './services/theme.service';

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
  isLoggedIn = false;
  userName = '';
  settingsOpen = false;

  constructor(
    private wishlistService: WishlistService,
    private router: Router,
    public auth: AuthService,
    public themeService: ThemeService
  ) {
    effect(() => {
      const user = this.auth.currentUser();
      this.isLoggedIn = !!user;
      this.userName = user ? user.name.split(' ')[0] : '';
    });
  }

  ngOnInit() {
    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }

  toggleSidebar() { this.isSidebarOpen = !this.isSidebarOpen; }

  setTheme(t: Theme) { this.themeService.setTheme(t); }

  signOut() {
    this.auth.logout();
    this.isSidebarOpen = false;
    this.router.navigate(['/home']);
  }
}
