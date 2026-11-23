export type EventCategory =
  | 'wedding'
  | 'buddhist-wedding'
  | 'birthday'
  | 'anniversary'
  | 'ceremony'
  | 'inauguration';

export type EventTheme =
  | 'royal-wedding'
  | 'luxury-birthday'
  | 'traditional-ceremony'
  | 'modern-anniversary'
  | string;

export type TemplateId =
  // Hindu Wedding Templates
  | 'hindu-royal-palace'
  | 'hindu-floral-pastel'
  | 'hindu-heritage-scroll'
  // Buddhist / Ambedkarite Wedding Templates
  | 'buddhist-dhamma-royal'
  | 'buddhist-panchsheel-ivory'
  | 'buddhist-heritage-gold'
  // Birthday Templates
  | 'birthday-kids-fun'
  | 'birthday-luxury-noir'
  // Anniversary Templates
  | 'anniversary-golden-journey'
  // Ceremony & Inauguration Templates
  | 'ceremony-griha-pravesh'
  | 'event-grand-opening'
  // Engagement & Living Video Templates
  | 'engagement-pastel-hydrangea';

export type CoverStyle =
  | 'wax-seal-envelope'
  | '3d-book'
  | 'curtain-reveal'
  | 'ribbon-cut';

export type SacredSymbol =
  | 'ganesha'
  | 'om'
  | 'kalash'
  | 'swastik'
  | 'buddha'
  | 'dhamma-chakra'
  | 'ambedkar'
  | 'ashoka-pillar'
  | 'lotus'
  | 'ribbon'
  | 'laurel-monogram'
  | 'none';

export type ParticleEffect =
  | 'rose-petals'
  | 'golden-sparkles'
  | 'floating-balloons'
  | 'lotus-petals'
  | 'hydrangea-petals'
  | 'none';

export interface SubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  dressCode?: string;
  dressCodeColorHex?: string;
  iconName?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
}

export interface VenueDetails {
  name: string;
  address: string;
  googleMapsUrl: string;
}

export interface RSVPDetails {
  whatsappNumber: string;
  contactPerson?: string;
  messageTemplate?: string;
}

export interface HeroDetails {
  mangalacharan?: string; // e.g. "नमो तस्स भगवतो अरहतो सम्मासम्बुद्धस्स" or "॥ श्री गणेशाय नमः ॥"
  primaryTitle?: string;  // e.g. "TOGETHER WITH THEIR FAMILIES" or "सप्रेम सस्नेह जय भीम"
  groomOrHost: string;    // e.g. "Aarav" or "Rahul"
  groomParents?: string;  // e.g. "Son of Mr. Rajesh & Mrs. Sunita Sharma"
  brideOrCelebrant?: string; // e.g. "Ananya" or "Priya"
  brideParents?: string;  // e.g. "Daughter of Mr. Gautam & Mrs. Maya Kamble"
  invitationText?: string;
  closingLine?: string;   // e.g. "With love, blessings & warm regards"
  heroImage: string;
  heroVideo?: string; // Optional animated living video / cinemagraph
  sacredSymbol?: SacredSymbol;
}

export interface Invitation {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'active' | 'live' | 'expired' | 'archived';
  isUnpaidDemo: boolean;
  category: EventCategory;
  templateId: TemplateId;
  theme?: string; // fallback theme reference
  coverStyle: CoverStyle;
  particleEffect: ParticleEffect;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  audioUrl?: string;
  musicPreset?: 'shehnai' | 'flute' | 'buddha-vandana' | 'acoustic' | 'custom';
  hero: HeroDetails;
  eventDate: string; // ISO 8601 string: 2027-02-12T22:30:00
  eventDateDisplay: string; // "Friday, 12 February 2027"
  subEvents: SubEvent[];
  gallery: GalleryItem[];
  venue: VenueDetails;
  rsvp: RSVPDetails;
  viewCount: number;
  // Lifecycle & Commercial Controls (Upgrade B)
  activeFrom?: string; // ISO string when link becomes public
  expiresAt?: string;  // ISO string when link expires
  maxViews?: number;   // Max view limit (0 = unlimited)
  currentViews?: number; // Unique visit/view tracker
  planName?: string;   // 'Starter' | 'Royal Experience' | 'Signature Custom'
  paymentStatus?: 'unpaid' | 'paid';
  orderId?: string;    // e.g. "ORD-94812" for self-service customer orders
  customerName?: string;
  customerPhone?: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}
