import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex max-w-2xl flex-col gap-3">
      <span class="text-xs font-semibold tracking-widest text-brand uppercase">
        {{ eyebrow() }}
      </span>
      <h2 class="font-display text-4xl font-extrabold text-balance sm:text-5xl">
        {{ title() }}
      </h2>
      @if (description()) {
        <p class="text-muted text-pretty">{{ description() }}</p>
      }
    </div>
  `,
})
export class SectionTitle {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
}
