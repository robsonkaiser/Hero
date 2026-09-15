import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutSection } from './components/about-section';
import { ContactSection } from './components/contact-section';
import { HeroSection } from './components/hero-section';
import { HighlightsSection } from './components/highlights-section';
import { PaymentSection } from './components/payment-section';
import { SiteFooter } from './components/site-footer';
import { SiteHeader } from './components/site-header';
import { TicketsSection } from './components/tickets-section';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteHeader,
    HeroSection,
    TicketsSection,
    HighlightsSection,
    AboutSection,
    PaymentSection,
    ContactSection,
    SiteFooter,
  ],
  template: `
    <app-site-header />
    <main>
      <app-hero-section />
      <app-tickets-section />
      <app-highlights-section />
      <app-about-section />
      <app-payment-section />
      <app-contact-section />
    </main>
    <app-site-footer />
  `,
})
export class App {}
