import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { EVENT } from '../event-data';

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div
        class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a href="#top" class="flex items-center gap-2.5">
          <span
            class="flex h-8 w-8 items-center justify-center rounded bg-brand font-display text-lg font-extrabold text-brand-ink"
          >
            P
          </span>
          <span class="font-display text-xl font-extrabold tracking-tight">
            {{ event.name }}
          </span>
        </a>

        <nav aria-label="Navegação principal" class="hidden items-center gap-1 md:flex">
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              class="rounded px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {{ link.label }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-2">
          @if (cart.totalItems() > 0) {
            <a
              href="#resumo"
              class="hidden items-center gap-2 rounded border border-brand/40 bg-brand/10 px-3 py-1.5 text-sm font-semibold text-brand sm:flex"
            >
              {{ cart.totalItems() }}
              {{ cart.totalItems() === 1 ? 'ingresso' : 'ingressos' }}
            </a>
          }
          <a
            href="#ingressos"
            class="hidden rounded bg-brand px-4 py-2 text-sm font-semibold text-brand-ink transition-opacity hover:opacity-90 sm:block"
          >
            Comprar
          </a>
          <button
            type="button"
            class="rounded border border-border p-2 text-muted transition-colors hover:text-foreground md:hidden"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="menu-mobile"
            (click)="menuOpen.set(!menuOpen())"
          >
            <span class="sr-only">Abrir menu de navegação</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              @if (menuOpen()) {
                <path d="M18 6 6 18M6 6l12 12" />
              } @else {
                <path d="M3 12h18M3 6h18M3 18h18" />
              }
            </svg>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <nav
          id="menu-mobile"
          aria-label="Navegação mobile"
          class="flex flex-col gap-1 border-t border-border bg-surface px-4 py-3 md:hidden"
        >
          @for (link of links; track link.href) {
            <a
              [href]="link.href"
              class="rounded px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
              (click)="menuOpen.set(false)"
            >
              {{ link.label }}
            </a>
          }
          <a
            href="#ingressos"
            class="mt-1 rounded bg-brand px-3 py-2.5 text-center text-sm font-semibold text-brand-ink"
            (click)="menuOpen.set(false)"
          >
            Comprar ingresso
          </a>
        </nav>
      }
    </header>
  `,
})
export class SiteHeader {
  protected readonly event = EVENT;
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { href: '#ingressos', label: 'Ingressos' },
    { href: '#evento', label: 'O Evento' },
    { href: '#sobre', label: 'Sobre' },
    { href: '#pagamento', label: 'Pagamento' },
    { href: '#contato', label: 'Contato' },
  ];

  constructor(protected readonly cart: CartService) {}
}
