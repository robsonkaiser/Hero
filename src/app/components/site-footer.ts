import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EVENT } from '../event-data';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-background">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between"
      >
        <div class="flex flex-col gap-2">
          <span class="font-display text-2xl font-extrabold">{{ event.name }}</span>
          <p class="text-sm text-muted">
            {{ event.date }} · {{ event.venue }} · {{ event.city }}
          </p>
          <p class="text-sm text-muted">
            Evento para maiores de {{ event.minAge }}. Documento com foto obrigatório.
          </p>
        </div>

        <nav aria-label="Links do rodapé" class="flex flex-col gap-2">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              class="text-sm text-muted transition-colors hover:text-brand"
            >
              {{ link.label }}
            </a>
          }
        </nav>
      </div>

      <div class="border-t border-border">
        <p class="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6">
          © 2026 {{ event.name }}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly event = EVENT;

  protected readonly links = [
    { href: '#ingressos', label: 'Ingressos' },
    { href: '#evento', label: 'O Evento' },
    { href: '#pagamento', label: 'Pagamento' },
    { href: '#contato', label: 'Contato' },
  ];
}
