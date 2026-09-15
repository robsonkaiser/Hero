import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAQ, PAYMENT_METHODS } from '../event-data';
import { SectionTitle } from './section-title';

@Component({
  selector: 'app-payment-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitle],
  template: `
    <section id="pagamento" class="border-b border-border">
      <div class="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <app-section-title
          eyebrow="04 — Pagamento"
          title="Compra segura"
          description="O pagamento é processado em ambiente criptografado. Não armazenamos dados do seu cartão."
        />

        <div class="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div class="flex flex-col gap-4">
            <h3 class="text-xs font-semibold tracking-widest text-muted uppercase">
              Formas de pagamento
            </h3>
            <ul class="flex flex-col gap-3">
              @for (method of methods; track method.id) {
                <li
                  class="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-5 py-4"
                >
                  <span class="font-display text-xl font-bold">{{ method.label }}</span>
                  <span class="text-sm text-muted">{{ method.detail }}</span>
                </li>
              }
            </ul>
            <p class="text-sm text-muted text-pretty">
              O ingresso com QR Code é enviado por e-mail assim que o pagamento é
              confirmado.
            </p>
          </div>

          <div class="flex flex-col gap-4">
            <h3 class="text-xs font-semibold tracking-widest text-muted uppercase">
              Perguntas frequentes
            </h3>
            <div class="flex flex-col gap-2">
              @for (item of faq; track item.question) {
                <details
                  class="group rounded-lg border border-border bg-surface px-5 py-4"
                >
                  <summary
                    class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"
                  >
                    {{ item.question }}
                    <span
                      class="shrink-0 text-xl text-brand transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p class="mt-3 text-sm text-muted text-pretty">{{ item.answer }}</p>
                </details>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PaymentSection {
  protected readonly methods = PAYMENT_METHODS;
  protected readonly faq = FAQ;
}
