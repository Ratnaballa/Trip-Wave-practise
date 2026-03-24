import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly KEY = 'tripwave_theme';

  readonly activeTheme = signal<Theme>(this.loadTheme());

  constructor() {
    effect(() => {
      const theme = this.activeTheme();
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(this.KEY, theme);
    });
  }

  setTheme(theme: Theme) {
    this.activeTheme.set(theme);
  }

  private loadTheme(): Theme {
    return (localStorage.getItem(this.KEY) as Theme) || 'light';
  }
}
