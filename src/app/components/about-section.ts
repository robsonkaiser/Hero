import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EVENT } from '../event-data';
import { SectionTitle } from './section-title';

@Component({
  selector: 'app-about-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitle],
  template: `
    <section id="sobre" class="border-b border-border">
      <div class="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div class="flex flex-col gap-6">
          <app-section-title
            eyebrow="03 — Sobre nós"
            title="Quem organiza"
          />
          <div class="flex flex-col gap-4 text-muted text-pretty">
            <p>
              O {{ event.name }} nasceu de um coletivo de produtores independentes com
              o objetivo de trazer produção de festival para espaços urbanos. Cada
              edição é montada de forma autoral, do line-up à cenografia.
            </p>
            <p>
              Já foram sete edições realizadas, sempre com foco em som de qualidade,
              público diverso e um ambiente onde todo mundo se sente à vontade para
              dançar até o sol nascer.
            </p>
          </div>
        </div>

        <dl class="grid gap-px self-start overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          @for (stat of stats; track stat.label) {
            <div class="flex flex-col gap-1 bg-surface p-6">
              <dt class="text-xs font-semibold tracking-widest text-muted uppercase">
                {{ stat.label }}
              </dt>
              <dd class="font-display text-4xl font-extrabold text-brand">
                {{ stat.value }}
              </dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
})
export class AboutSection {
  protected readonly event = EVENT;

  protected readonly stats = [
    { label: 'Edições realizadas', value: '7' },
    { label: 'Público por edição', value: '3 mil' },
    { label: 'Artistas convidados', value: '40+' },
    { label: 'Idade mínima', value: '18' },
  ];
}
