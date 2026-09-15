import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HIGHLIGHTS } from '../event-data';
import { SectionTitle } from './section-title';

@Component({
  selector: 'app-highlights-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitle],
  template: `
    <section id="evento" class="border-b border-border">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <app-section-title
          eyebrow="02 — O Evento"
          title="O que te espera"
          description="Uma noite inteira de programação contínua, com estrutura pensada para você aproveitar do começo ao fim."
        />

        <ul class="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          @for (item of highlights; track item.title) {
            <li class="flex flex-col gap-2 bg-surface p-6">
              <h3 class="font-display text-xl font-bold">{{ item.title }}</h3>
              <p class="text-sm text-muted text-pretty">{{ item.description }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class HighlightsSection {
  protected readonly highlights = HIGHLIGHTS;
}
