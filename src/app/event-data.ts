export interface TicketBatch {
  id: string;
  name: string;
  price: number;
  description: string;
  soldOut: boolean;
  max: number;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface PaymentMethod {
  id: 'pix' | 'credito' | 'debito';
  label: string;
  detail: string;
}

export const EVENT = {
  name: 'Pulso Festival',
  edition: 'Edição 2027',
  tagline: 'Uma noite. Três palcos. Som sem pausa.',
  date: '20 de Março de 2027',
  /** Usada pelo contador regressivo. */
  startsAt: '2027-03-20T22:00:00-03:00',
  shortDate: '20.03.27',
  time: '22:00 - 06:00',
  venue: 'Galpão Central',
  city: 'São Paulo, SP',
  minAge: '18 anos',
  instagram: 'https://instagram.com',
  whatsapp: 'https://wa.me/5511999999999',
  email: 'contato@pulsofestival.com.br',
};

export const TICKET_BATCHES: TicketBatch[] = [
  {
    id: 'promocional',
    name: 'Lote Promocional',
    price: 25,
    description:
      'Quantidade limitada. A venda é encerrada automaticamente quando o estoque do lote acabar.',
    soldOut: true,
    max: 6,
  },
  {
    id: 'primeiro',
    name: '1º Lote',
    price: 40,
    description:
      'Ingresso de entrada única com acesso a todos os palcos durante toda a noite.',
    soldOut: false,
    max: 6,
  },
  {
    id: 'segundo',
    name: '2º Lote',
    price: 55,
    description:
      'Liberado após o encerramento do 1º Lote ou na virada de data programada.',
    soldOut: false,
    max: 6,
  },
  {
    id: 'combo-duplo',
    name: 'Combo Duplo',
    price: 70,
    description:
      'Dois ingressos com valor reduzido por pessoa. Ideal para quem vai acompanhado.',
    soldOut: false,
    max: 4,
  },
];

export const HIGHLIGHTS: Highlight[] = [
  {
    title: 'Três palcos simultâneos',
    description:
      'House e techno no palco principal, ritmos brasileiros no galpão lateral e set aberto no rooftop.',
  },
  {
    title: 'Line-up nacional',
    description:
      'Artistas convidados de São Paulo, Rio e Belo Horizonte em rodadas de duas horas cada.',
  },
  {
    title: 'Estrutura completa',
    description:
      'Bares em todos os ambientes, área de descanso coberta e praça de alimentação até o fim do evento.',
  },
  {
    title: 'Som e luz dedicados',
    description:
      'Line array em cada palco, mapeamento de luz sincronizado e operação técnica ao vivo.',
  },
  {
    title: 'Entrada organizada',
    description:
      'Filas separadas por lote, leitura de QR Code na portaria e equipe de apoio em toda a fila.',
  },
  {
    title: 'Segurança em todo o espaço',
    description:
      'Equipe treinada, posto de primeiros socorros e monitoramento em todos os ambientes.',
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pix', label: 'PIX', detail: 'Aprovação imediata' },
  { id: 'credito', label: 'Cartão de crédito', detail: 'Até 3x sem juros' },
  { id: 'debito', label: 'Cartão de débito', detail: 'Débito à vista' },
];

export const FAQ = [
  {
    question: 'Como recebo meu ingresso?',
    answer:
      'Após a confirmação do pagamento, o ingresso com QR Code é enviado para o e-mail informado na compra.',
  },
  {
    question: 'Posso transferir meu ingresso?',
    answer:
      'Sim. A transferência pode ser feita até 24 horas antes do evento informando o nome do novo titular.',
  },
  {
    question: 'Qual a idade mínima?',
    answer:
      'A entrada é permitida a partir de 18 anos, com apresentação de documento oficial com foto na portaria.',
  },
  {
    question: 'E se eu não puder ir?',
    answer:
      'O cancelamento com reembolso integral pode ser solicitado até 7 dias após a compra, conforme a lei.',
  },
];
