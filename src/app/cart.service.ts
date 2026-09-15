import { Injectable, computed, signal } from '@angular/core';
import { TICKET_BATCHES, type TicketBatch } from './event-data';

export interface CartLine {
  batch: TicketBatch;
  quantity: number;
  subtotal: number;
}

const SERVICE_FEE_RATE = 0.1;

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly quantities = signal<Record<string, number>>({});

  readonly batches = TICKET_BATCHES;

  readonly lines = computed<CartLine[]>(() => {
    const map = this.quantities();
    return this.batches
      .filter((batch) => (map[batch.id] ?? 0) > 0)
      .map((batch) => {
        const quantity = map[batch.id] ?? 0;
        return { batch, quantity, subtotal: batch.price * quantity };
      });
  });

  readonly totalItems = computed(() =>
    this.lines().reduce((sum, line) => sum + line.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.lines().reduce((sum, line) => sum + line.subtotal, 0),
  );

  readonly serviceFee = computed(
    () => Math.round(this.subtotal() * SERVICE_FEE_RATE * 100) / 100,
  );

  readonly total = computed(() => this.subtotal() + this.serviceFee());

  quantityOf(batchId: string): number {
    return this.quantities()[batchId] ?? 0;
  }

  increment(batch: TicketBatch): void {
    if (batch.soldOut) return;
    this.quantities.update((map) => {
      const next = Math.min((map[batch.id] ?? 0) + 1, batch.max);
      return { ...map, [batch.id]: next };
    });
  }

  decrement(batch: TicketBatch): void {
    this.quantities.update((map) => {
      const next = Math.max((map[batch.id] ?? 0) - 1, 0);
      return { ...map, [batch.id]: next };
    });
  }

  clear(): void {
    this.quantities.set({});
  }
}
