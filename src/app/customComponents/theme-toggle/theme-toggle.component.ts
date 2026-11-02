import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      type="button"
      role="switch"
      class="relative flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border transition-colors"
      [class]="solid ? 'border-custom-blue bg-custom-blue shadow-custom-card' : 'border-white/60 bg-white/20 hover:bg-white/30'"
      [attr.aria-checked]="theme.isDark"
      [attr.aria-label]="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      [title]="theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      (click)="theme.toggle()"
    >
      <span
        class="absolute top-0.5 left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-custom-blue shadow transition-transform duration-200"
        [class.translate-x-6]="theme.isDark"
      >
        @if (theme.isDark) {
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        } @else {
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        }
      </span>
    </button>
  `,
})
export class ThemeToggleComponent {
  /** solid blue variant for use on surfaces that aren't the blue header */
  @Input() solid = false;

  constructor(public theme: ThemeService) {}
}
