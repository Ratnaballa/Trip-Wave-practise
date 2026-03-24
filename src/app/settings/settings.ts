import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme } from '../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css']
})
export class Settings {
  activeSection = 'appearance';

  // Appearance
  language = 'en';
  currency = 'INR';

  // Notifications
  bookingAlerts  = true;
  dealAlerts     = true;
  newsletter     = false;
  smsAlerts      = false;

  // Privacy
  profileVisible = true;
  activityStatus = true;
  dataSharing    = false;

  // Travel Preferences
  seatPreference  = 'window';
  mealPreference  = 'veg';
  travelClass     = 'economy';

  saved  = false;
  saving = false;

  sections = [
    { id: 'appearance',   icon: '🎨', label: 'Appearance'    },
    { id: 'notifications',icon: '🔔', label: 'Notifications' },
    { id: 'privacy',      icon: '🔒', label: 'Privacy'       },
    { id: 'travel',       icon: '✈️', label: 'Travel Prefs'  },
    { id: 'regional',     icon: '🌍', label: 'Regional'      },
  ];

  constructor(public themeService: ThemeService) {}

  setTheme(t: Theme) { this.themeService.setTheme(t); }

  saveSettings() {
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
      this.saved  = true;
      setTimeout(() => this.saved = false, 3000);
    }, 800);
  }
}
