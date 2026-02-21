import type { ComponentType } from 'react';

export type TopicModule = {
  default: ComponentType<{ components?: Record<string, unknown> }>;
};

export type Unit = {
  id: string;
  title: string;
  order: number;
};

export type Topic = {
  slug: string;
  title: string;
  unitId: string;
  order: number;
  load: () => Promise<TopicModule>;
};

export const units: Unit[] = [
  { id: 'getting-started', title: 'Başlangıç', order: 1 },
  { id: 'unite-1', title: '1. ÜNİTE: DEĞİŞEN DÜNYA DENGELERİ KARŞISINDA OSMANLI SİYASETİ (1595-1774)', order: 2 },
  { id: 'unite-2', title: '2. ÜNİTE: DEĞİŞİM ÇAĞINDA AVRUPA VE OSMANLI', order: 3 },
  { id: 'unite-3', title: '3. ÜNİTE: DEVRİMLER ÇAĞINDA DEĞİŞEN DEVLET-TOPLUM İLİŞKİLERİ', order: 4 },
  { id: 'unite-4', title: '4. ÜNİTE: ULUSLARARASI İLİŞKİLERDE DENGE STRATEJİSİ (1774-1914)', order: 5 },
  { id: 'unite-5', title: '5. ÜNİTE: XIX VE XX. YÜZYILDA DEĞİŞEN SOSYOEKONOMİK HAYAT', order: 6 },
];

export const topics: Topic[] = [
  {
    slug: 'welcome',
    title: "Tarihche'ye Hoş Geldiniz",
    unitId: 'getting-started',
    order: 1,
    load: () => import('./topics/welcome.mdx'),
  },
  {
    slug: 'how-to-use',
    title: 'Nasıl Kullanılır',
    unitId: 'getting-started',
    order: 2,
    load: () => import('./topics/how-to-use.mdx'),
  },
  // ÜNİTE 1
  {
    slug: '17-yuzyil-osmanli-siyasi-gelismeleri',
    title: '1595-1700 Yılları Arasında Osmanlı Devleti ve Siyasi Gelişmeler',
    unitId: 'unite-1',
    order: 1,
    load: () => import('./topics/17-yuzyil-osmanli-siyasi-gelismeleri.mdx'),
  },
  {
    slug: 'avrupali-gucler-ve-osmanli-denizciligi',
    title: "Avrupalı Güçlerin ve Osmanlı Devleti'nin Denizcilik Faaliyetleri",
    unitId: 'unite-1',
    order: 2,
    load: () => import('./topics/avrupali-gucler-ve-osmanli-denizciligi.mdx'),
  },
  {
    slug: '18-yuzyil-osmanli-siyasi-gelismeleri-1',
    title: '1700-1774 Yılları Arasında Osmanlı Devleti ve Siyasi Gelişmeler',
    unitId: 'unite-1',
    order: 3,
    load: () => import('./topics/18-yuzyil-osmanli-siyasi-gelismeleri-1.mdx'),
  },
  {
    slug: '18-yuzyil-osmanli-siyasi-gelismeleri-2',
    title: '18. Yüzyıl Osmanlı Devleti Siyasi Gelişmeleri (İran, Rusya ve Küçük Kaynarca)',
    unitId: 'unite-1',
    order: 4,
    load: () => import('./topics/18-yuzyil-osmanli-siyasi-gelismeleri-2.mdx'),
  },
  // ÜNİTE 2
  {
    slug: 'yeni-cagda-avrupa-ve-degisim',
    title: "Yeni Çağ'da Avrupa, Westphalia Barışı ve Bilim Devrimi",
    unitId: 'unite-2',
    order: 1,
    load: () => import('./topics/yeni-cagda-avrupa-ve-degisim.mdx'),
  },
  {
    slug: 'avrupadaki-gelismelerin-osmanliya-etkileri',
    title: "Avrupa'daki Gelişmeler Karşısında Osmanlı Devleti",
    unitId: 'unite-2',
    order: 2,
    load: () => import('./topics/avrupadaki-gelismelerin-osmanliya-etkileri.mdx'),
  },
  {
    slug: '17-ve-18-yuzyil-osmanli-ic-gelismeleri-ve-isyanlar',
    title: "17. Yüzyılda Osmanlı Devleti'nde Çözülme Belirtileri",
    unitId: 'unite-2',
    order: 3,
    load: () => import('./topics/17-ve-18-yuzyil-osmanli-ic-gelismeleri-ve-isyanlar.mdx'),
  },
  // ÜNİTE 3
  {
    slug: 'fransiz-ihtilali-ve-etkileri',
    title: "Fransız İhtilali'nin Nedenleri",
    unitId: 'unite-3',
    order: 1,
    load: () => import('./topics/fransiz-ihtilali-ve-etkileri.mdx'),
  },
  {
    slug: 'sanayi-devrimi-ve-endustriyel-uretim',
    title: "Sanayi Devrimi'nin Doğuşu ve Buhar Gücü",
    unitId: 'unite-3',
    order: 2,
    load: () => import('./topics/sanayi-devrimi-ve-endustriyel-uretim.mdx'),
  },
  {
    slug: 'avrupada-siyasi-ve-ekonomik-degisimler',
    title: "Avrupa'da Siyasi Düşünce Değişimi ve Anayasal Monarşiler",
    unitId: 'unite-3',
    order: 3,
    load: () => import('./topics/avrupada-siyasi-ve-ekonomik-degisimler.mdx'),
  },
  {
    slug: 'osmanli-modern-ordu-teskilati',
    title: "Avrupa'da Zorunlu Askerlik Sisteminin Doğuşu",
    unitId: 'unite-3',
    order: 4,
    load: () => import('./topics/osmanli-modern-ordu-teskilati.mdx'),
  },
  {
    slug: 'endustrilesme-ulasim-ve-haberlesme',
    title: 'Demir Yolu Taşımacılığı ve Etkileri',
    unitId: 'unite-3',
    order: 5,
    load: () => import('./topics/endustrilesme-ulasim-ve-haberlesme.mdx'),
  },
  {
    slug: 'osmanli-modern-egitim-kurumlari',
    title: 'Modern Eğitim Kurumlarının Açılması',
    unitId: 'unite-3',
    order: 6,
    load: () => import('./topics/osmanli-modern-egitim-kurumlari.mdx'),
  },
  {
    slug: 'ikinci-abdulhamid-sosyal-devlet',
    title: 'Sosyal Devlet Anlayışının Kurumsallaşması',
    unitId: 'unite-3',
    order: 7,
    load: () => import('./topics/ikinci-abdulhamid-sosyal-devlet.mdx'),
  },
  {
    slug: 'turk-tarihinin-degismez-unsurlari',
    title: '1. Dil (Türkçe)',
    unitId: 'unite-3',
    order: 8,
    load: () => import('./topics/turk-tarihinin-degismez-unsurlari.mdx'),
  },
  // ÜNİTE 4
  {
    slug: '19-yuzyil-osmanli-avrupa-siyasi-iliskileri',
    title: '1774-1914 Yılları Arası Önemli Siyasi Gelişmeler',
    unitId: 'unite-4',
    order: 1,
    load: () => import('./topics/19-yuzyil-osmanli-avrupa-siyasi-iliskileri.mdx'),
  },
  {
    slug: 'misir-ve-bogazlar-sorunlari',
    title: 'Mısır Sorunu ve Mehmet Ali Paşa İsyanı',
    unitId: 'unite-4',
    order: 2,
    load: () => import('./topics/misir-ve-bogazlar-sorunlari.mdx'),
  },
  {
    slug: 'osmanli-rus-rekabeti-ve-bloklasma',
    title: '1768-1914 Osmanlı-Rus Rekabeti',
    unitId: 'unite-4',
    order: 3,
    load: () => import('./topics/osmanli-rus-rekabeti-ve-bloklasma.mdx'),
  },
  {
    slug: 'osmanli-demokratiklesme-hareketleri',
    title: '1. Sened-i İttifak (1808)',
    unitId: 'unite-4',
    order: 4,
    load: () => import('./topics/osmanli-demokratiklesme-hareketleri.mdx'),
  },
  {
    slug: 'osmanli-darbeler-ve-toprak-kayiplari',
    title: "1. 1876 Darbesi (Sultan Abdülaziz'in Tahttan İndirilmesi)",
    unitId: 'unite-4',
    order: 5,
    load: () => import('./topics/osmanli-darbeler-ve-toprak-kayiplari.mdx'),
  },
  // ÜNİTE 5
  {
    slug: 'osmanli-ekonomisi-ve-sanayilesme-cabalari',
    title: 'Sanayi Devrimi Öncesi Osmanlı Ekonomisi',
    unitId: 'unite-5',
    order: 1,
    load: () => import('./topics/osmanli-ekonomisi-ve-sanayilesme-cabalari.mdx'),
  },
  {
    slug: 'osmanli-dis-borclanma-ve-milli-iktisat',
    title: 'Dış Borçlanma ve Ekonomik Çöküş',
    unitId: 'unite-5',
    order: 2,
    load: () => import('./topics/osmanli-dis-borclanma-ve-milli-iktisat.mdx'),
  },
  {
    slug: 'osmanli-nufus-hareketleri-ve-gocler',
    title: "Osmanlı Devleti'nde Nüfus Artış Hızının Azalması",
    unitId: 'unite-5',
    order: 3,
    load: () => import('./topics/osmanli-nufus-hareketleri-ve-gocler.mdx'),
  },
  {
    slug: 'modernlesme-sehirlesme-ve-salgin-hastaliklar',
    title: 'Sanayileşme ve Kentleşme',
    unitId: 'unite-5',
    order: 4,
    load: () => import('./topics/modernlesme-sehirlesme-ve-salgin-hastaliklar.mdx'),
  },
  {
    slug: 'osmanli-basin-ve-kamuoyu',
    title: 'Basın ve Kamuoyunun Ortaya Çıkışı',
    unitId: 'unite-5',
    order: 5,
    load: () => import('./topics/osmanli-basin-ve-kamuoyu.mdx'),
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getOrderedTopics(): Topic[] {
  const unitOrder = new Map(units.map((u) => [u.id, u.order] as const));
  return [...topics].sort((a, b) => {
    const ua = unitOrder.get(a.unitId) ?? 0;
    const ub = unitOrder.get(b.unitId) ?? 0;
    if (ua !== ub) return ua - ub;
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export function getFirstTopicSlug(): string {
  return getOrderedTopics()[0]?.slug ?? '';
}

export function getTopicNeighbors(slug: string): {
  prev: Topic | null;
  next: Topic | null;
} {
  const ordered = getOrderedTopics();
  const index = ordered.findIndex((t) => t.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: ordered[index - 1] ?? null,
    next: ordered[index + 1] ?? null,
  };
}

export function getUnitsWithTopics(): Array<Unit & { topics: Topic[] }> {
  const sortedUnits = [...units].sort((a, b) => a.order - b.order);
  const sortedTopics = [...topics].sort((a, b) => a.order - b.order);

  return sortedUnits.map((unit) => ({
    ...unit,
    topics: sortedTopics.filter((t) => t.unitId === unit.id),
  }));
}
