import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EVENT } from '../event-data';
import { SectionTitle } from './section-title';

@Component({
  selector: 'app-contact-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, SectionTitle],
  template: `
    <section id="contato" class="border-b border-border">
      <div class="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div class="flex flex-col gap-6">
          <app-section-title
            eyebrow="05 — Contato"
            title="Fale com a produção"
            description="Dúvidas sobre ingressos, acessibilidade ou parcerias? Responderemos em até um dia útil."
          />
          <dl class="flex flex-col gap-4">
            @for (item of channels; track item.label) {
              <div class="flex flex-col gap-0.5">
                <dt class="text-xs font-semibold tracking-widest text-muted uppercase">
                  {{ item.label }}
                </dt>
                <dd>
                  <a
                    [href]="item.href"
                    class="font-medium text-brand underline-offset-4 hover:underline"
                  >
                    {{ item.value }}
                  </a>
                </dd>
              </div>
            }
          </dl>
        </div>

        <form
          class="flex flex-col gap-4 rounded-lg border border-border bg-surface p-6"
          (ngSubmit)="submit()"
        >
          <div class="flex flex-col gap-1.5">
            <label for="nome" class="text-sm font-semibold">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              autocomplete="name"
              [(ngModel)]="name"
              class="rounded border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted"
              placeholder="Seu nome completo"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="email" class="text-sm font-semibold">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autocomplete="email"
              [(ngModel)]="email"
              class="rounded border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted"
              placeholder="voce@email.com"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label for="mensagem" class="text-sm font-semibold">Mensagem</label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows="4"
              required
              [(ngModel)]="message"
              class="resize-none rounded border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted"
              placeholder="Como podemos ajudar?"
            ></textarea>
          </div>
          <button
            type="submit"
            class="rounded bg-brand px-5 py-3 font-semibold text-brand-ink transition-opacity hover:opacity-90"
          >
            Enviar mensagem
          </button>
          <p
            class="text-sm text-brand"
            role="status"
            [class.invisible]="!sent()"
          >
            Mensagem enviada. Entraremos em contato em breve.
          </p>
        </form>
      </div>
    </section>
  `,
})
export class ContactSection {
  protected name = '';
  protected email = '';
  protected message = '';
  protected readonly sent = signal(false);

  protected readonly channels = [
    { label: 'E-mail', value: EVENT.email, href: 'mailto:' + EVENT.email },
    { label: 'WhatsApp', value: '(11) 99999-9999', href: EVENT.whatsapp },
    { label: 'Instagram', value: '@pulsofestival', href: EVENT.instagram },
    {
      label: 'Local',
      value: EVENT.venue + ' — ' + EVENT.city,
      href: 'https://maps.google.com',
    },
  ];

  protected submit(): void {
    this.sent.set(true);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
