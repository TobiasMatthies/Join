import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/**
 * Holds the active theme and applies it as a `dark` class on <html>.
 * Initial value: stored choice, otherwise the OS preference.
 * index.html applies the same logic before bootstrap to avoid a flash.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme: Theme = this.readInitialTheme();

  constructor() {
    this.apply();
  }

  get isDark(): boolean {
    return this.theme === 'dark';
  }

  toggle() {
    this.theme = this.isDark ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, this.theme);
    } catch {}
    this.apply();
  }

  private apply() {
    document.documentElement.classList.toggle('dark', this.isDark);
  }

  private readInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
}
