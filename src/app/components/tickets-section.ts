import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart.service';
import { PAYMENT_METHODS } from '../event-data';
import { SectionTitle } from './section-title';

@Component({
  selector: 'app-tickets-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, SectionTitle],
  template: `
    <section id="ingressos" class="border-b border-border">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <app-section-title
          eyebrow="01 — Ingressos"
          title="Escolha seu lote"
          description="Os valores sobem conforme os lotes esgotam. A taxa de serviço é calculada no resumo."
        />

        <div class="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <ul class="flex flex-col gap-4">
            @for (batch of cart.batches; track batch.id) {
              <li
                class="flex flex-col gap-5 rounded-lg border border-border bg-surface p-5 transition-colors sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                [class.opacity-55]="batch.soldOut"
                [class.border-brand]="!batch.soldOut && cart.quantityOf(batch.id) > 0"
              >
                <div class="flex flex-col gap-1.5">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-display text-2xl font-bold">{{ batch.name }}</h3>
                    @if (batch.soldOut) {
                      <span
                        class="rounded bg-border px-2 py-0.5 text-xs font-semibold tracking-wider text-muted uppercase"
                      >
                        Esgotado
                      </span>
                    }
                  </div>
                  <p class="font-display text-3xl font-extrabold text-brand">
                    {{ batch.price | currency }}
                  </p>
                  <p class="max-w-md text-sm text-muted text-pretty">
                    {{ batch.description }}
                  </p>
                </div>

                @if (batch.soldOut) {
                  <p class="shrink-0 text-sm font-medium text-muted">
                    Vendas encerradas
                  </p>
                } @else {
                  <div
                    class="flex shrink-0 items-center gap-1 rounded-lg border border-border bg-background p-1"
                    role="group"
                    [attr.aria-label]="'Quantidade de ' + batch.name"
                  >
                    <button
                      type="button"
                      class="flex h-10 w-10 items-center justify-center rounded text-xl font-semibold text-foreground transition-colors hover:bg-surface disabled:opacity-30"
                      [disabled]="cart.quantityOf(batch.id) === 0"
                      (click)="cart.decrement(batch)"
                    >
                      <span class="sr-only">Remover um ingresso de {{ batch.name }}</span>
                      <span aria-hidden="true">−</span>
                    </button>
                    <output
                      class="w-10 text-center font-display text-xl font-bold tabular-nums"
                      [attr.aria-label]="
                        cart.quantityOf(batch.id) + ' ingressos de ' + batch.name
                      "
                    >
                      {{ cart.quantityOf(batch.id) }}
                    </output>
                    <button
                      type="button"
                      class="flex h-10 w-10 items-center justify-center rounded text-xl font-semibold text-foreground transition-colors hover:bg-surface disabled:opacity-30"
                      [disabled]="cart.quantityOf(batch.id) >= batch.max"
                      (click)="cart.increment(batch)"
                    >
                      <span
                        class="sr-only"
                      >Adicionar um ingresso de {{ batch.name }}</span>
                      <span aria-hidden="true">+</span>
                    </button>
                  </div>
                }
              </li>
            }
          </ul>

          <aside
            id="resumo"
            class="flex flex-col gap-5 rounded-lg border border-border bg-surface p-6 lg:sticky lg:top-24"
            aria-label="Resumo do pedido"
          >
            <h3 class="font-display text-2xl font-bold">Resumo do pedido</h3>

            @if (cart.lines().length === 0) {
              <p class="text-sm text-muted text-pretty">
                Nenhum ingresso selecionado. Use os botões ao lado para escolher a
                quantidade.
              </p>
            } @else {
              <ul class="flex flex-col gap-3 border-b border-border pb-5">
                @for (line of cart.lines(); track line.batch.id) {
                  <li class="flex items-baseline justify-between gap-3 text-sm">
                    <span class="text-muted">
                      {{ line.quantity }}× {{ line.batch.name }}
                    </span>
                    <span class="font-semibold tabular-nums">
                      {{ line.subtotal | currency }}
                    </span>
                  </li>
                }
              </ul>

              <dl class="flex flex-col gap-2 text-sm">
                <div class="flex items-baseline justify-between gap-3">
                  <dt class="text-muted">Subtotal</dt>
                  <dd class="tabular-nums">{{ cart.subtotal() | currency }}</dd>
                </div>
                <div class="flex items-baseline justify-between gap-3">
                  <dt class="text-muted">Taxa de serviço (10%)</dt>
                  <dd class="tabular-nums">{{ cart.serviceFee() | currency }}</dd>
                </div>
                <div
                  class="mt-2 flex items-baseline justify-between gap-3 border-t border-border pt-3"
                >
                  <dt class="font-display text-lg font-bold">Total</dt>
                  <dd
                    class="font-display text-2xl font-extrabold text-brand tabular-nums"
                  >
                    {{ cart.total() | currency }}
                  </dd>
                </div>
              </dl>
            }

            <button
              type="button"
              class="rounded bg-brand px-5 py-3 font-semibold text-brand-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              [disabled]="cart.totalItems() === 0"
              (click)="openCheckout()"
            >
              Finalizar compra
            </button>
            @if (checkoutOpen()) {
    <div class="flex flex-col gap-5 border-t border-border pt-5">
     <div>
      <h4 class="font-display text-xl font-bold">Finalizar compra</h4>
      <p class="mt-1 text-sm text-muted">
        Escolha a forma de pagamento e informe seu e-mail.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium" for="email">
        E-mail
      </label>

      <input
        id="email"
        type="email"
        placeholder="seu@email.com"
        class="rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand"
      />
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-sm font-medium">Forma de pagamento</p>

      @for (method of methods; track method.id) {
        <button
          type="button"
          class="rounded border border-border px-4 py-3 text-left text-sm transition-colors hover:border-brand"
        >
          {{ method.label }}
        </button>
      }
    </div>
  </div>
}
          

            @if (cart.totalItems() > 0) {
              <button
                type="button"
                class="text-sm font-medium text-muted underline transition-colors hover:text-foreground"
                (click)="cart.clear()"
              >
                Limpar seleção
              </button>
            }

            <div class="flex flex-wrap gap-2 border-t border-border pt-4">
              @for (method of methods; track method.id) {
                <span
                  class="rounded border border-border px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {{ method.label }}
                </span>
              }
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
})
export class TicketsSection {
  protected readonly methods = PAYMENT_METHODS;
  protected readonly checkoutOpen = signal(false);

protected openCheckout(): void {
  this.checkoutOpen.set(true);
}

  constructor(protected readonly cart: CartService) {}
}
