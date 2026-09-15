import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EVENT } from '../event-data';
import { Countdown } from './countdown';

@Component({
  selector: 'app-hero-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Countdown],
  template: `
    <section id="top" class="relative overflow-hidden border-b border-border">
      <img
        src="hero-crowd.png"
        alt="Público lotado em pista de dança iluminada por lasers ciano em meio à fumaça"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div
        class="absolute inset-0 bg-linear-to-b from-background/70 via-background/85 to-background"
        aria-hidden="true"
      ></div>
      <div class="absolute inset-0 bg-grid opacity-40" aria-hidden="true"></div>

      <div
        class="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
      >
        <span
          class="rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-semibold tracking-widest text-brand uppercase"
        >
          {{ event.edition }}
        </span>

        <div class="flex flex-col gap-5">
          <h1
            class="font-display text-6xl font-extrabold text-balance sm:text-8xl lg:text-9xl"
          >
            {{ event.name }}
          </h1>
          <p class="max-w-xl text-lg text-muted text-pretty sm:text-xl">
            {{ event.tagline }}
          </p>
        </div>

        <dl class="flex flex-wrap gap-x-8 gap-y-4">
          @for (item of facts; track item.label) {
            <div class="flex flex-col gap-0.5">
              <dt class="text-xs font-semibold tracking-widest text-muted uppercase">
                {{ item.label }}
              </dt>
              <dd class="font-display text-2xl font-bold">{{ item.value }}</dd>
            </div>
          }
        </dl>

        <app-countdown />

        <div class="flex flex-wrap items-center gap-3">
          <a
            href="#ingressos"
            class="rounded bg-brand px-6 py-3 font-semibold text-brand-ink transition-opacity hover:opacity-90"
          >
            Garantir meu ingresso
          </a>
          <a
            href="#evento"
            class="rounded border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:border-brand/50 hover:text-brand"
          >
            Ver o que te espera
          </a>
        </div>
      </div>
    </section>
  `,
})
export class HeroSection {
  protected readonly event = EVENT;

  protected readonly facts = [
    { label: 'Data', value: EVENT.shortDate },
    { label: 'Horário', value: EVENT.time },
    { label: 'Local', value: EVENT.venue },
    { label: 'Cidade', value: EVENT.city },
  ];
}
