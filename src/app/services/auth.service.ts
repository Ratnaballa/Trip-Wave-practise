import { Injectable, signal, computed } from '@angular/core';

export interface AuthUser { name: string; email: string; isLoggedIn: boolean; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly KEY = 'tripwave_user';

  private _user = signal<AuthUser | null>(this.loadUser());

  /** Read-only signal — use in templates or effects */
  readonly currentUser = this._user.asReadonly();

  /** Computed signal — true when a user is stored */
  readonly isLoggedIn = computed(() => !!this._user());

  /** Backward-compat observable for app.ts effect migration */
  get user$() {
    // thin shim so existing subscribers still work during transition
    return { subscribe: (fn: (u: AuthUser | null) => void) => { fn(this._user()); return { unsubscribe() {} }; } };
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.KEY);
      const u = raw ? JSON.parse(raw) : null;
      if (u) console.log('[AuthService] Restored session:', u.email);
      return u;
    } catch { return null; }
  }

  getUser(): AuthUser | null { return this._user(); }

  getUserEmail(): string { return this._user()?.email ?? ''; }

  login(email: string, password: string, name: string): boolean {
    if (!email || !password) return false;
    const user: AuthUser = { name: name.trim() || 'Traveler', email, isLoggedIn: true };
    try {
      localStorage.setItem(this.KEY, JSON.stringify(user));
      const verify = localStorage.getItem(this.KEY);
      console.log('[AuthService] User logged in:', user);
      console.log('[AuthService] Storage verify:', verify ? 'SAVED ✅' : 'NOT SAVED ❌');
    } catch (e) {
      console.error('[AuthService] localStorage write FAILED:', e);
    }
    this._user.set(user);
    return true;
  }

  logout() {
    const email = this.getUserEmail();
    localStorage.removeItem(this.KEY);
    this._user.set(null);
    console.log('[AuthService] User logged out:', email);
  }
}
