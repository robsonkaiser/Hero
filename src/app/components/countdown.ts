import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { EVENT } from '../event-data';

const EVENT_DATE = new Date(EVENT.startsAt).getTime();

@Component({
  selector: 'app-countdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-wrap items-center gap-3"
      role="timer"
      aria-live="off"
      [attr.aria-label]="'Faltam ' + parts().days + ' dias para o evento'"
    >
      @for (part of parts().list; track part.label) {
        <div
          class="flex min-w-20 flex-col items-center rounded border border-border bg-surface/80 px-4 py-3"
        >
          <span class="font-display text-3xl font-extrabold text-brand tabular-nums">
            {{ part.value }}
          </span>
          <span class="text-xs font-semibold tracking-widest text-muted uppercase">
            {{ part.label }}
          </span>
        </div>
      }
    </div>
  `,
})
export class Countdown {
  private readonly now = signal(Date.now());

  protected readonly parts = computed(() => {
    const diff = Math.max(EVENT_DATE - this.now(), 0);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      list: [
        { label: 'Dias', value: this.pad(days) },
        { label: 'Horas', value: this.pad(hours) },
        { label: 'Min', value: this.pad(minutes) },
        { label: 'Seg', value: this.pad(seconds) },
      ],
    };
  });

  constructor() {
    const timer = setInterval(() => this.now.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  private pad(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
