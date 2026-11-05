/**
 * All copy, prices and photos live here. Services, prices, hours and reviews
 * were taken from the studio's Fresha profile (November 2026) — update them
 * here and every page follows.
 */

const FRESHA = 'https://www.fresha.com/a/indulura-beauty-studio-cape-town-67-chelsea-crescent-u4efl4mb';

export const brand = {
  name: 'Indulura',
  sub: 'Beauty Studio',
  by: 'by Tissy',
  owner: 'Christie',
  ownerAka: 'Tissy',
  role: 'Owner & senior nail technician',
  years: '12+',
  rating: '5.0',
  reviewCount: 71,
  credential: 'Capri Pro Nails Brand Ambassador',
  bookUrl: `${FRESHA}/booking?allOffer=true`,
  profileUrl: FRESHA,
  reviewsUrl: `${FRESHA}?reviews=true`,
  address: ['67 Chelsea Crescent', 'Parklands, Milnerton Rural', 'Cape Town, Western Cape'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=67+Chelsea+Crescent%2C+Parklands%2C+Cape+Town',
  mapEmbed: 'https://www.google.com/maps?q=67+Chelsea+Crescent,+Parklands,+Cape+Town&z=15&output=embed',
};

export const pages = [
  {label: 'Home', to: '/'},
  {label: 'Services', to: '/services'},
  {label: 'Portfolio', to: '/portfolio'},
  {label: 'About', to: '/about'},
  {label: 'Reviews', to: '/reviews'},
  {label: 'Book', to: '/book'},
];

export const hours: [string, string][] = [
  ['Monday', '08:00 – 21:00'],
  ['Tuesday', '08:00 – 21:00'],
  ['Wednesday', '08:00 – 21:00'],
  ['Thursday', '08:00 – 21:00'],
  ['Friday', '08:00 – 21:00'],
  ['Saturday', '08:00 – 21:00'],
  ['Sunday', 'Closed'],
];

/** Headline lines; `i` lines are set in italic. */
export type Line = {t: string; i?: boolean};

export const home = {
  lines: [{t: 'Nails built'}, {t: 'by hand.', i: true}, {t: 'Shaped to'}, {t: 'last.', i: true}] as Line[],
  body: 'Structured gel and natural-nail specialist in Parklands, Cape Town. A private, one-on-one studio where every set is built with precision, patience and twelve years of practice.',
  book: ['Book your', 'appointment'],
  intro:
    'Every set starts with the natural nail. Tissy builds structure where it is needed, keeps it light where it is not, and finishes with the kind of detail that makes people ask who did your nails.',
};

export type Media = {src: string; alt: string; wide?: boolean};

const m = (f: string) => `${import.meta.env.BASE_URL}media/${f}`;

/** The hero slideshow — landscape photos, darkest first. */
export const heroSlides: Media[] = [
  {src: m('pearl-tortoise-gold.jpg'), alt: 'Short round nails in pearl chrome, tortoiseshell and nude with fine gold linework'},
  {src: m('iridescent.jpg'), alt: 'Sheer nude nails with iridescent foil, a silver-outlined accent and a glass butterfly'},
  {src: m('black-tips.jpg'), alt: 'Almond nails with a nude base and gunmetal chrome French tips'},
];

export type Signature = {id: string; name: [string, string]; specs: [string, string][]; tint: string};

/** Three panels on Home — three slices of ONE photograph. */
export const signature = {
  image: {src: m('pearl-tortoise-gold.jpg'), alt: ''},
  items: [
    {id: 'builder', name: ['Structured', 'Builder Gel'], specs: [['Time', '3 hr'], ['From', 'R600']], tint: '#6b3a22'},
    {id: 'soft', name: ['Soft Gel', 'Extensions'], specs: [['Time', '3 hr'], ['Price', 'R600']], tint: '#e7c8bb'},
    {id: 'hybrid', name: ['Hybrid Gel', 'Extensions'], specs: [['Time', '3 hr'], ['From', 'R600']], tint: '#a7b5ad'},
  ] as Signature[],
};

export type Service = {name: string; time: string; price: string; from?: boolean; desc?: string};
export type Category = {id: string; title: [string, string]; note?: string; items: Service[]};

export const services: Category[] = [
  {
    id: 'nail-services',
    title: ['Nail', 'services'],
    note: 'All nail services are booked with Christie, senior technician.',
    items: [
      {name: 'Go Lac Gel Overlay', time: '2 hr', price: 'R470', desc: 'Done on natural nails. Includes one plain colour.'},
      {name: 'Hard Gel Overlay', time: '2 hr 30 min', price: 'R500', desc: 'A durable, non-soak-off gel coating that reinforces your natural nails for extra strength and a flawless, long-lasting finish.'},
      {name: 'Soft Gel Extensions', time: '3 hr', price: 'R600', desc: 'Pre-shaped soft gel tips bonded to the natural nail and cured for a smooth, seamless extension. Instant length with a natural, lightweight feel and minimal stress on your own nails.'},
      {name: 'Structured Hybrid Gel Extensions', time: '3 hr', price: 'R600', from: true, desc: 'The strength of hard gel with the flexibility of acrylic. Sculpted to your chosen shape and length and finished with glossy gel polish: durable, without the heaviness.'},
      {name: 'Structured Builder / Hard Gel Extensions', time: '3 hr', price: 'R600', from: true, desc: 'A thick builder gel sculpted and cured over the natural nail for strong, flexible, natural-looking length, with a protective layer that supports nail health.'},
    ],
  },
  {
    id: 'fills',
    title: ['Fills &', 'fixes'],
    note: 'Rebalances keep your structure, apex and length in proportion as your nails grow. The 5+ week price depends on how much work is needed.',
    items: [
      {name: '2 Week Rebalance', time: '2 hr', price: 'R390'},
      {name: '3 Week Rebalance', time: '2 hr 30 min', price: 'R450'},
      {name: '4 Week Rebalance', time: '3 hr', price: 'R500'},
      {name: '5+ Weeks Rebalance', time: '3 hr 30 min', price: 'R560', from: true, desc: 'Price is confirmed after your nails are assessed.'},
      {name: 'Nail Fix', time: '15 min', price: 'R50', desc: 'A single broken or lifted nail.'},
    ],
  },
  {
    id: 'nail-art',
    title: ['Nail', 'art'],
    note: 'Nail art is added to your chosen nail service. Not sure which tier your design is? Send your inspiration photo on WhatsApp before booking. The final tier is confirmed by the design.',
    items: [
      {name: 'Tier 1: Minimal', time: '+15 min', price: 'R30', from: true, desc: 'Dots, lines, stickers, minimal foil, simple accents or light embellishment.'},
      {name: 'Tier 2: Signature', time: '+30 min', price: 'R60', from: true, desc: 'More detail across several nails: simple hand-painting, cat-eye combinations, mixed effects or moderate embellishment.'},
      {name: 'Tier 3: Detailed', time: '+45 min', price: 'R120', from: true, desc: 'Intricate hand-painting, layered effects and multiple detailed feature nails.'},
      {name: 'Tier 4: Bespoke', time: '+1 hr', price: 'R180', from: true, desc: 'Fully customised art: intricate hand-painted work, extensive embellishment or 3D elements. Send a photo first so Tissy can confirm price and time.'},
      {name: 'Add Chrome', time: '+5 min', price: 'R30', desc: 'One fixed price, on as many nails as you like.'},
      {name: 'Add French', time: '+30 min', price: 'R50'},
    ],
  },
  {
    id: 'removals',
    title: ['Soak-off', 'removals'],
    items: [
      {name: 'Indulura Removal', time: '30 min', price: 'R80', desc: 'Gentle soak-off of Indulura work.'},
      {name: 'Foreign Gel / Acrylic Removal', time: '1 hr', price: 'R150', desc: 'Soak-off of work done elsewhere.'},
    ],
  },
];

export const portfolio: Media[] = [
  {src: m('sage-gold-leaf.jpg'), alt: 'Almond nails in sage and milky white with hand-painted gold branches and white blossoms'},
  {src: m('pearl-tortoise-gold.jpg'), alt: 'Pearl chrome, tortoiseshell and nude nails with gold linework', wide: true},
  {src: m('french-florals.jpg'), alt: 'Nude almond nails with crisp white French tips and white hand-painted flowers'},
  {src: m('ombre-flame.jpg'), alt: 'Ombré flame nail art'},
  {src: m('iridescent.jpg'), alt: 'Iridescent foil, silver outline and glass butterfly accents on nude nails', wide: true},
  {src: m('green-leaves-gold.jpg'), alt: 'Gel nail art with green leaves and gold accents'},
  {src: m('gold-star.jpg'), alt: 'Nail art with gold accents and a star design'},
  {src: m('black-tips.jpg'), alt: 'Nude almond nails with gunmetal chrome French tips', wide: true},
  {src: m('glossy-french.jpg'), alt: 'A glossy classic French manicure'},
  {src: m('polka-floral.jpg'), alt: 'Polka dots and floral accents'},
  {src: m('gemstones.jpg'), alt: 'Elegant nails with gemstone embellishment', wide: true},
  {src: m('french-polka.jpg'), alt: 'French manicure with polka-dot accents'},
  {src: m('dot-design.jpg'), alt: 'Gel manicure with a delicate dot design'},
  {src: m('orange-petals.jpg'), alt: 'Delicate floral nail art with orange petals', wide: true},
  {src: m('black-art-rhinestones.jpg'), alt: 'Black hand-painted detail and rhinestones', wide: true},
  {src: m('gold-blue.jpg'), alt: 'Nail art with gold and blue details', wide: true},
  {src: m('vibrant-floral.jpg'), alt: 'Bright floral nail art', wide: true},
  {src: m('rainbow.jpg'), alt: 'Rainbow nail art', wide: true},
];

export const about = {
  portrait: {src: m('christie.jpg'), alt: 'Christie, known as Tissy, owner of Indulura Beauty Studio'},
  studio: {src: m('studio.jpg'), alt: 'The Indulura studio: a wooden nail desk with ring light, UV lamp and walls of gel colours by a sunny window'},
  story: [
    'Christie, known to her clients as Tissy, has spent more than twelve years perfecting structured gel. Indulura is her private home studio in Parklands: one client, one chair, and no rushing.',
    'Her work starts with the natural nail. Structure goes where it is needed and stays light where it is not, so your set looks refined, wears comfortably and grows out beautifully between rebalances.',
    'She works with Builder Gel, Hard Gel, Soft Gel Extensions, Sculpted BIAB and Hybrid Gel Extensions, and finishes with anything from a clean French to fully hand-painted art.',
  ],
  principles: [
    {k: 'Integrity', v: 'Healthy natural nails come first. Prep is careful, removals are gentle, and nothing is filed away that does not need to be.'},
    {k: 'Precision', v: 'Apex, sidewalls and free edge are balanced by hand on every nail, so your set looks right from every angle.'},
    {k: 'Longevity', v: 'Built to last the full cycle to your next rebalance, without lifting, chipping or bulk.'},
  ],
  facts: ['Private one-on-one studio', 'Instant booking confirmation', 'Parking available', 'Near public transport', 'Kid-friendly', 'Woman-owned'],
};

export type Review = {name: string; text: string; when: string; service: string};

export const reviews: Review[] = [
  {name: 'Sharon T', text: 'My nails haven’t looked this beautiful in ages! She carefully rebuilt the damaged areas and gave me such a clean, neat manicure. The gel polish is smooth, shiny and beautifully applied without being thick or bulky. So happy with the results!', when: 'October 2026', service: '2 services'},
  {name: 'Caitlin M', text: 'Christie never disappoints! Her attention to detail is incredible, you’ll never find that elsewhere. Highly recommend!', when: 'October 2026', service: '4 Week Rebalance'},
  {name: 'Linda Ann S', text: 'Stunning as always - this lady is definitely on top of the top tier of Nail technicians - anywhere in my opinion', when: 'October 2026', service: '4 Week Rebalance'},
  {name: 'Linda Ann S', text: 'Fantastic as always - that’s why l will always support this business', when: 'March 2026', service: '3 Week Rebalance'},
  {name: 'Linda Ann S', text: 'Absolutely fabulous as always', when: 'August 2026', service: '4 Week Rebalance'},
];

export const footerNote = 'Structured gel & natural-nail specialist · Parklands, Cape Town';
