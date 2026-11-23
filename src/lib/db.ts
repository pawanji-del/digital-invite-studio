import fs from "fs/promises";
import path from "path";
import { Invitation } from "./types";
import { connectToDatabase } from "./mongodb";
import { InvitationModel } from "@/models/InvitationModel";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "invitations.json");

const SEED_INVITATIONS: Invitation[] = [
  // Flagship Engagement: Kiara & Arjun (Pastel Hydrangea with Living Motion Video)
  {
    id: "kiara-arjun-engagement-2025",
    slug: "kiara-weds-arjun",
    title: "Kiara & Arjun's Engagement Party",
    status: "active",
    isUnpaidDemo: false,
    category: "wedding",
    templateId: "engagement-pastel-hydrangea",
    coverStyle: "wax-seal-envelope",
    particleEffect: "hydrangea-petals",
    ogTitle: "Kiara & Arjun are Engaged! 💍✨",
    ogDescription: "You are cordially invited to celebrate the Engagement Party of Kiara & Arjun at The Ivy Ballroom.",
    ogImage: "/images/kiara-arjun-hero.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    hero: {
      mangalacharan: "॥ प्रेम व आनंद ॥",
      primaryTitle: "YOU ARE INVITED TO THE ENGAGEMENT PARTY OF",
      groomOrHost: "Arjun",
      groomParents: "Son of Mr. Vikram & Mrs. Shweta Singhania",
      brideOrCelebrant: "Kiara",
      brideParents: "Daughter of Mr. Rajiv & Mrs. Meera Kapoor",
      invitationText: "Together with our families, we invite you to join us as we begin our forever with laughter, dancing and celebration.",
      closingLine: "With love, blessings & warm regards, Singhania & Kapoor Families",
      heroImage: "/images/kiara-arjun-hero.jpg",
      heroVideo: "/videos/kiara-arjun-engagement.mp4",
      sacredSymbol: "laurel-monogram",
    },
    eventDate: "2025-05-24T16:00:00",
    eventDateDisplay: "Saturday, May 24, 2025",
    subEvents: [
      {
        id: "ev-1",
        title: "Ring Exchange Ceremony",
        date: "Sat, 24 May 2025",
        time: "04:30 PM",
        venue: "Crystal Ballroom, The Ivy",
        dressCode: "Pastel Blue & Western Glam",
        dressCodeColorHex: "#93C5FD",
        iconName: "HeartHandshake",
      },
      {
        id: "ev-2",
        title: "Cocktail Dinner & Dancing",
        date: "Sat, 24 May 2025",
        time: "07:30 PM onwards",
        venue: "Grand Courtyard, The Ivy Ballroom",
        dressCode: "Black Tie & Elegant Cocktail",
        dressCodeColorHex: "#1E3A8A",
        iconName: "Wine",
      },
    ],
    gallery: [
      {
        id: "g-1",
        url: "/images/kiara-arjun-hero.jpg",
        caption: "Our proposal moments under the stars",
      },
    ],
    venue: {
      name: "The Ivy Ballroom",
      address: "Palace Road, Beverly Estate, South Mumbai",
      googleMapsUrl: "https://maps.google.com/?q=The+Ivy+Ballroom",
    },
    rsvp: {
      whatsappNumber: "919876543210",
      contactPerson: "Singhania Family",
    },
    createdAt: "2026-11-23T08:00:00.000Z",
    updatedAt: "2026-11-23T08:00:00.000Z",
    viewCount: 42,
    currentViews: 42,
    maxViews: 0,
    activeFrom: "2025-01-01T00:00:00.000Z",
    expiresAt: "2028-01-01T00:00:00.000Z",
    planName: "Signature Custom",
    paymentStatus: "paid",
  },
  // 1. Hindu Wedding: Royal Palace
  {
    id: "aarav-ananya-2027",
    slug: "aarav-weds-ananya",
    title: "Aarav Weds Ananya (Royal Palace)",
    status: "live",
    isUnpaidDemo: false,
    category: "wedding",
    templateId: "hindu-royal-palace",
    coverStyle: "3d-book",
    particleEffect: "rose-petals",
    ogTitle: "Aarav & Ananya are getting married! 💍✨",
    ogDescription: "Together with their families, Aarav & Ananya request the pleasure of your company to celebrate their royal wedding celebrations in Jaipur.",
    ogImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    hero: {
      mangalacharan: "॥ श्री गणेशाय नमः ॥",
      primaryTitle: "TOGETHER WITH THEIR FAMILIES",
      groomOrHost: "Aarav",
      groomParents: "Son of Mr. Rajesh Sharma & Mrs. Sunita Sharma",
      brideOrCelebrant: "Ananya",
      brideParents: "Daughter of Mr. Vikram Mehta & Mrs. Kavita Mehta",
      invitationText: "cordially invite you to celebrate the joyous wedding celebrations of their beloved children",
      closingLine: "With love, blessings & warm regards, Sharma & Mehta Families",
      heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "ganesha",
    },
    eventDate: "2027-02-12T22:30:00",
    eventDateDisplay: "Friday, 12 February 2027",
    subEvents: [
      {
        id: "ev-1",
        title: "Mata Pujan",
        date: "Wed, 10 Feb 2027",
        time: "10:00 AM",
        venue: "Sharma Residence, Malviya Nagar, Jaipur",
        dressCode: "Traditional Yellow & Gold",
        dressCodeColorHex: "#EAB308",
        iconName: "Flame",
      },
      {
        id: "ev-2",
        title: "Mehendi Ki Raat",
        date: "Thu, 11 Feb 2027",
        time: "12:00 PM",
        venue: "The Courtyard, Raj Vilas Palace",
        dressCode: "Mehendi Green & Floral",
        dressCodeColorHex: "#15803D",
        iconName: "Sparkles",
      },
      {
        id: "ev-3",
        title: "Sangeet & Cocktail",
        date: "Thu, 11 Feb 2027",
        time: "07:30 PM",
        venue: "Royal Ballroom, Raj Vilas Palace",
        dressCode: "Indo-Western & Glamour",
        dressCodeColorHex: "#9333EA",
        iconName: "Music",
      },
      {
        id: "ev-4",
        title: "Haldi Ceremony",
        date: "Fri, 12 Feb 2027",
        time: "10:30 AM",
        venue: "Poolside Gardens, Raj Vilas",
        dressCode: "Bright Sunshine Yellow",
        dressCodeColorHex: "#FACC15",
        iconName: "Sun",
      },
      {
        id: "ev-5",
        title: "Baraat & Pheras",
        date: "Fri, 12 Feb 2027",
        time: "07:00 PM (Pheras 10:30 PM)",
        venue: "The Central Mandap, Raj Vilas Palace",
        dressCode: "Royal Pastels & Sherwanis",
        dressCodeColorHex: "#F43F5E",
        iconName: "HeartHandshake",
      },
      {
        id: "ev-6",
        title: "The Grand Reception",
        date: "Sat, 13 Feb 2027",
        time: "08:00 PM onwards",
        venue: "Sheesh Mahal, Raj Vilas Palace",
        dressCode: "Black Tie & Elegant Sarees",
        dressCodeColorHex: "#881337",
        iconName: "Wine",
      },
    ],
    gallery: [
      {
        id: "gal-1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
        caption: "Racing up together",
      },
      {
        id: "gal-2",
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
        caption: "The first hello",
      },
      {
        id: "gal-3",
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80",
        caption: "Promises forever",
      },
      {
        id: "gal-4",
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
        caption: "Two souls, one destiny",
      },
    ],
    venue: {
      name: "Raj Vilas Palace",
      address: "Amer Road, near Jal Mahal, Jaipur, Rajasthan 302002",
      googleMapsUrl: "https://maps.google.com/?q=Raj+Vilas+Palace+Amer+Road+Jaipur",
    },
    rsvp: {
      whatsappNumber: "919876543210",
      contactPerson: "Rajesh Sharma",
      messageTemplate: "Namaste! We are delighted to attend Aarav & Ananya's wedding. Count us in!",
    },
    viewCount: 164,
    createdAt: "2026-11-20T10:00:00.000Z",
    updatedAt: "2026-11-22T12:00:00.000Z",
  },

  // 2. Buddhist / Ambedkarite Wedding: Dhamma Royal (Blue & Gold)
  {
    id: "rahul-priya-dhamma-2027",
    slug: "rahul-priya-dhamma-vivah",
    title: "Rahul & Priya - बौद्ध मंगल परिणय",
    status: "live",
    isUnpaidDemo: false,
    category: "buddhist-wedding",
    templateId: "buddhist-dhamma-royal",
    coverStyle: "wax-seal-envelope",
    particleEffect: "lotus-petals",
    ogTitle: "Rahul & Priya बौद्ध धम्म विवाह संस्कार ☸️💙",
    ogDescription: "तथागत गौतम बुद्ध आणि परमपूज्य डॉ. बाबासाहेब आंबेडकर यांच्या पावन आशीर्वादाने राहुल व प्रिया यांचा बौद्ध मंगल परिणय सोहळा.",
    ogImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    hero: {
      mangalacharan: "नमो तस्स भगवतो अरहतो सम्मासम्बुद्धस्स",
      primaryTitle: "सप्रेम सस्नेह जय भीम",
      groomOrHost: "Rahul",
      groomParents: "सुपुत्र: मा. सिद्धार्थ व सौ. यशोदा कांबळे",
      brideOrCelebrant: "Priya",
      brideParents: "सुपुत्री: मा. आनंदराव व सौ. प्रमिला मेश्राम",
      invitationText: "तथागत गौतम बुद्ध आणि बोधिसत्व भारतरत्न डॉ. बाबासाहेब आंबेडकर यांच्या पावन प्रेरणेने आयोजित बौद्ध विवाह संस्कारास आपले सहकुटुंब स्वागत आहे.",
      closingLine: "स्नेही: कांबळे व मेश्राम परिवार • सप्रेम जय भीम",
      heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "dhamma-chakra",
    },
    eventDate: "2027-03-05T11:30:00",
    eventDateDisplay: "Friday, 5 March 2027",
    subEvents: [
      {
        id: "b-ev-1",
        title: "बुद्ध वंदना व त्रिशरण पंचशील",
        date: "Fri, 5 Mar 2027",
        time: "10:30 AM",
        venue: "दीक्षाभूमी सभागृह, नागपूर",
        dressCode: "शुभ्र पांढरे वस्त्र (White & Gold)",
        dressCodeColorHex: "#FFFFFF",
        iconName: "Sparkles",
      },
      {
        id: "b-ev-2",
        title: "मंगल परिणय विधी व सप्तपदी",
        date: "Fri, 5 Mar 2027",
        time: "11:30 AM (शुभ मुहूर्त)",
        venue: "मुख्य मंडप, दीक्षाभूमी लॉन्स",
        dressCode: "रॉयल ब्लू / पांढरा पारंपारिक",
        dressCodeColorHex: "#1E3A8A",
        iconName: "HeartHandshake",
      },
      {
        id: "b-ev-3",
        title: "प्रीतीभोज व सत्कार सोहळा",
        date: "Fri, 5 Mar 2027",
        time: "01:00 PM onwards",
        venue: "बँक्वेट हॉल, नागपूर",
        dressCode: "उत्सवी पोशाख",
        dressCodeColorHex: "#D4AF37",
        iconName: "Utensils",
      },
    ],
    gallery: [
      {
        id: "bgal-1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
        caption: "धम्म संगीताची मंगल सुरुवात",
      },
      {
        id: "bgal-2",
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
        caption: "दोन मनांचे धम्म मिलन",
      },
    ],
    venue: {
      name: "Deekshabhoomi Celebration Ground",
      address: "Laxminagar, South Ambazari Road, Nagpur, Maharashtra 440022",
      googleMapsUrl: "https://maps.google.com/?q=Deekshabhoomi+Nagpur",
    },
    rsvp: {
      whatsappNumber: "919822334455",
      contactPerson: "Siddharth Kamble",
      messageTemplate: "सप्रेम जय भीम! राहुल व प्रिया यांच्या मंगल परिणयास उपस्थित राहून सस्नेह शुभेच्छा देण्यास आम्ही निश्चित येत आहोत.",
    },
    viewCount: 198,
    createdAt: "2026-11-21T11:00:00.000Z",
    updatedAt: "2026-11-22T14:30:00.000Z",
  },

  // 3. Hindu Wedding: Floral Pastel (Blush & Mint)
  {
    id: "aditi-rohit-2027",
    slug: "aditi-rohit-pastel-wedding",
    title: "Aditi & Rohit - Pastel Floral Wedding",
    status: "live",
    isUnpaidDemo: false,
    category: "wedding",
    templateId: "hindu-floral-pastel",
    coverStyle: "wax-seal-envelope",
    particleEffect: "rose-petals",
    ogTitle: "Aditi & Rohit are tying the knot! 🌸🌿",
    ogDescription: "Join us in Goa for a dreamy pastel beachside celebration of love, music, and forever promises.",
    ogImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    hero: {
      mangalacharan: "॥ शुभम् भवतु ॥",
      primaryTitle: "CELEBRATING WITH JOY",
      groomOrHost: "Rohit",
      groomParents: "Son of Mr. Sunil & Mrs. Anita Singhania",
      brideOrCelebrant: "Aditi",
      brideParents: "Daughter of Dr. Arvind & Dr. Renu Goel",
      invitationText: "invite you to share in the joy of their beachside sunset wedding ceremony in South Goa",
      closingLine: "Singhania & Goel Families",
      heroImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "ganesha",
    },
    eventDate: "2027-04-18T17:30:00",
    eventDateDisplay: "Sunday, 18 April 2027",
    subEvents: [
      {
        id: "p-1",
        title: "Sunset Mehendi by the Bay",
        date: "Sat, 17 Apr 2027",
        time: "04:30 PM",
        venue: "Seaside Palm Grove, Alila Diwa, Goa",
        dressCode: "Boho Mint & Pastel Florals",
        dressCodeColorHex: "#0F766E",
        iconName: "Sparkles",
      },
      {
        id: "p-2",
        title: "Beachside Sunset Pheras",
        date: "Sun, 18 Apr 2027",
        time: "05:30 PM",
        venue: "Sunset Beach Deck",
        dressCode: "Blush Pink & Ivory",
        dressCodeColorHex: "#FB7185",
        iconName: "HeartHandshake",
      },
    ],
    gallery: [
      {
        id: "pgal-1",
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
        caption: "By the waves forever",
      },
    ],
    venue: {
      name: "Alila Diwa Resort & Spa",
      address: "48/10, Adao Waddo, Majorda, Goa 403713",
      googleMapsUrl: "https://maps.google.com/?q=Alila+Diwa+Goa",
    },
    rsvp: {
      whatsappNumber: "919811002233",
      contactPerson: "Sunil Singhania",
      messageTemplate: "Hello! We are excited to join Aditi & Rohit's destination wedding in Goa!",
    },
    viewCount: 112,
    createdAt: "2026-11-21T15:00:00.000Z",
    updatedAt: "2026-11-22T13:00:00.000Z",
  },

  // 4. Birthday: Kids Fun Safari (Demo Watermark)
  {
    id: "rohan-turns-5-demo",
    slug: "rohan-turns-5",
    title: "Rohan Turns 5 - Safari Adventure!",
    status: "live",
    isUnpaidDemo: true,
    category: "birthday",
    templateId: "birthday-kids-fun",
    coverStyle: "curtain-reveal",
    particleEffect: "floating-balloons",
    ogTitle: "Roar! Rohan is Turning 5! 🦁🎈",
    ogDescription: "Join us for an exciting Jungle Safari Adventure to celebrate little Rohan's 5th Birthday Bash!",
    ogImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_245236ec9c.mp3?filename=happy-kids-108150.mp3",
    hero: {
      mangalacharan: "HAPPY 5TH BIRTHDAY!",
      primaryTitle: "OUR LITTLE SAFARI EXPLORER",
      groomOrHost: "Rohan",
      groomParents: "Son of Rahul & Sneha Kapoor",
      brideOrCelebrant: "",
      brideParents: "",
      invitationText: "invites all little lions and adventurers for an afternoon of magic, balloon twisting, animal encounters & giant cake!",
      closingLine: "Kapoor Family",
      heroImage: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "none",
    },
    eventDate: "2026-12-15T16:00:00",
    eventDateDisplay: "Tuesday, 15 December 2026",
    subEvents: [
      {
        id: "b-1",
        title: "Safari Gates Open",
        date: "Tue, 15 Dec 2026",
        time: "04:00 PM",
        venue: "Jungle Club Lawn, Indiranagar, Bangalore",
        dressCode: "Safari / Animal Print / Khaki",
        dressCodeColorHex: "#65A30D",
        iconName: "Sun",
      },
      {
        id: "b-2",
        title: "Magic Show & Balloon Twisting",
        date: "Tue, 15 Dec 2026",
        time: "05:00 PM",
        venue: "Indoor Play Dome",
        dressCode: "Comfy Playwear",
        dressCodeColorHex: "#0EA5E9",
        iconName: "Sparkles",
      },
    ],
    gallery: [
      {
        id: "bgal-1",
        url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80",
        caption: "Year 1 to Year 5!",
      },
    ],
    venue: {
      name: "The Jungle Club Lawn",
      address: "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
      googleMapsUrl: "https://maps.google.com/?q=Indiranagar+Club+Bangalore",
    },
    rsvp: {
      whatsappNumber: "919876500000",
      contactPerson: "Sneha Kapoor",
      messageTemplate: "Yay! We would love to join Rohan's 5th Birthday party!",
    },
    viewCount: 48,
    createdAt: "2026-11-21T09:00:00.000Z",
    updatedAt: "2026-11-22T14:00:00.000Z",
  },

  // 5. Ceremony: Griha Pravesh & Vastu Shanti
  {
    id: "sharma-griha-pravesh-2026",
    slug: "sharma-griha-pravesh",
    title: "Sharma Family Griha Pravesh",
    status: "live",
    isUnpaidDemo: false,
    category: "ceremony",
    templateId: "ceremony-griha-pravesh",
    coverStyle: "3d-book",
    particleEffect: "rose-petals",
    ogTitle: "Griha Pravesh & Vastu Shanti Invitation 🪔🏡",
    ogDescription: "Sharma family cordially invites you to the auspicious Housewarming Ceremony of their new home 'Aashirwad'.",
    ogImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    hero: {
      mangalacharan: "॥ ॐ नमो भगवते वासुदेवाय ॥",
      primaryTitle: "WITH THE BLESSINGS OF ALMIGHTY",
      groomOrHost: "Er. Alok & Dr. Meenakshi Sharma",
      groomParents: "Blessed by Late Sh. Ram Prasad Sharma",
      brideOrCelebrant: "",
      brideParents: "",
      invitationText: "request the pleasure of your presence to bless our new abode on the auspicious occasion of Griha Pravesh & Vastu Shanti",
      closingLine: "Alok, Meenakshi, Ayush & Anvi",
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "kalash",
    },
    eventDate: "2026-12-08T09:30:00",
    eventDateDisplay: "Tuesday, 8 December 2026",
    subEvents: [
      {
        id: "g-1",
        title: "Vastu Shanti & Navgrah Havan",
        date: "Tue, 8 Dec 2026",
        time: "09:30 AM",
        venue: "'Aashirwad', Villa 42, Palm Greens, Sector 62, Noida",
        dressCode: "Traditional Indian / Kurta / Saree",
        dressCodeColorHex: "#D97706",
        iconName: "Flame",
      },
      {
        id: "g-2",
        title: "Mahaprasad & Lunch",
        date: "Tue, 8 Dec 2026",
        time: "01:00 PM onwards",
        venue: "Community Hall, Palm Greens Club",
        dressCode: "Traditional",
        dressCodeColorHex: "#16A34A",
        iconName: "Utensils",
      },
    ],
    gallery: [
      {
        id: "ggal-1",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",
        caption: "Our dream home 'Aashirwad'",
      },
    ],
    venue: {
      name: "'Aashirwad' - Villa 42",
      address: "Palm Greens Township, Sector 62, Noida, UP 201309",
      googleMapsUrl: "https://maps.google.com/?q=Sector+62+Noida",
    },
    rsvp: {
      whatsappNumber: "919811223344",
      contactPerson: "Alok Sharma",
      messageTemplate: "Namaste Sharma ji! Congratulations on your new home. We will definitely come to bless the home!",
    },
    viewCount: 65,
    createdAt: "2026-11-21T14:00:00.000Z",
    updatedAt: "2026-11-22T08:00:00.000Z",
  },

  // 6. Inauguration: Grand Opening with Interactive Ribbon Cut
  {
    id: "apex-tech-grand-opening-2027",
    slug: "apex-tech-grand-opening",
    title: "Apex Innovation Studio - Grand Opening",
    status: "live",
    isUnpaidDemo: false,
    category: "inauguration",
    templateId: "event-grand-opening",
    coverStyle: "ribbon-cut",
    particleEffect: "golden-sparkles",
    ogTitle: "Grand Opening & Ribbon Cutting Ceremony 🎀🏢",
    ogDescription: "You are cordially invited to celebrate the grand inauguration of our flagship Design & Innovation Studio in Cyber City.",
    ogImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_245236ec9c.mp3?filename=happy-kids-108150.mp3",
    hero: {
      mangalacharan: "IN THE PRESENCE OF ESTEEMED GUESTS",
      primaryTitle: "OFFICIAL INAUGURATION & RIBBON CUTTING",
      groomOrHost: "Apex Digital Studios",
      groomParents: "Founded by Er. Vikramaditya Rathore",
      brideOrCelebrant: "",
      brideParents: "",
      invitationText: "cordially requests the pleasure of your esteemed presence at the ribbon cutting & grand opening gala of our state-of-the-art facility",
      closingLine: "Leadership Team & Board of Directors",
      heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "ribbon",
    },
    eventDate: "2027-01-10T11:00:00",
    eventDateDisplay: "Sunday, 10 January 2027",
    subEvents: [
      {
        id: "in-1",
        title: "Welcome Reception & Coffee",
        date: "Sun, 10 Jan 2027",
        time: "10:30 AM",
        venue: "Ground Floor Atrium, Cyber Tower A",
        dressCode: "Business Formal / Smart Elegant",
        dressCodeColorHex: "#991B1B",
        iconName: "Sparkles",
      },
      {
        id: "in-2",
        title: "Auspicious Ribbon Cutting Ceremony",
        date: "Sun, 10 Jan 2027",
        time: "11:15 AM",
        venue: "Main Innovation Lab Entrance",
        dressCode: "Formal",
        dressCodeColorHex: "#D4AF37",
        iconName: "Wine",
      },
    ],
    gallery: [
      {
        id: "ingal-1",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
        caption: "Where creativity meets engineering",
      },
    ],
    venue: {
      name: "Cyber Tower A - Level 4",
      address: "DLF Cyber City, Phase 2, Gurugram, Haryana 122002",
      googleMapsUrl: "https://maps.google.com/?q=Cyber+City+Gurugram",
    },
    rsvp: {
      whatsappNumber: "919810099887",
      contactPerson: "Corporate Relations Desk",
      messageTemplate: "Greetings! I am pleased to confirm my attendance for the Apex Studio Grand Opening ceremony.",
    },
    viewCount: 77,
    createdAt: "2026-11-21T16:00:00.000Z",
    updatedAt: "2026-11-22T10:00:00.000Z",
  },

  // 7. Concluded / Expired Example Record
  {
    id: "neha-kabir-anniversary-2026",
    slug: "neha-kabir-silver-jubilee",
    title: "Neha & Kabir's 25th Silver Jubilee",
    status: "expired",
    isUnpaidDemo: false,
    category: "anniversary",
    templateId: "anniversary-golden-journey",
    coverStyle: "curtain-reveal",
    particleEffect: "golden-sparkles",
    planName: "Starter",
    paymentStatus: "paid",
    activeFrom: "2026-10-01T00:00:00.000Z",
    expiresAt: "2026-11-01T00:00:00.000Z",
    maxViews: 100,
    currentViews: 100,
    viewCount: 100,
    ogTitle: "Celebrating 25 Years of Togetherness 🥂💍",
    ogDescription: "Neha & Kabir celebrated their Silver Wedding Jubilee at The Grand Ballroom.",
    ogImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    hero: {
      mangalacharan: "॥ Celebrating 25 Glorious Years ॥",
      primaryTitle: "SILVER JUBILEE GALA",
      groomOrHost: "Kabir",
      groomParents: "",
      brideOrCelebrant: "Neha",
      brideParents: "",
      invitationText: "cordially invited all family & friends to celebrate our 25th wedding anniversary",
      closingLine: "With love & gratitude, Neha, Kabir, Rohan & Tanya",
      heroImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "none",
    },
    eventDate: "2026-10-25T19:30:00",
    eventDateDisplay: "Saturday, 25 October 2026",
    subEvents: [
      {
        id: "a-1",
        title: "Silver Gala & Toast",
        date: "Sat, 25 Oct 2026",
        time: "07:30 PM",
        venue: "The Grand Ballroom, Taj Palace, New Delhi",
        dressCode: "Black Tie / Emerald & Gold",
        dressCodeColorHex: "#0F766E",
        iconName: "Wine",
      },
    ],
    gallery: [],
    venue: {
      name: "The Grand Ballroom, Taj Palace",
      address: "Sardar Patel Marg, Diplomatic Enclave, New Delhi 110021",
      googleMapsUrl: "https://maps.google.com/?q=Taj+Palace+New+Delhi",
    },
    rsvp: {
      whatsappNumber: "919811223344",
      contactPerson: "Kabir Kapoor",
    },
    createdAt: "2026-10-01T10:00:00.000Z",
    updatedAt: "2026-11-01T00:00:00.000Z",
  },

  // 8. Self-Service Pending Customer Order Record
  {
    id: "order-vikram-pooja-sangeet-2027",
    slug: "vikram-pooja-grand-sangeet",
    title: "Vikram & Pooja - Grand Sangeet Night",
    status: "draft",
    isUnpaidDemo: true,
    orderId: "ORD-67219",
    customerName: "Vikram Malhotra",
    customerPhone: "919876543210",
    customerNotes: "Please use royal maroon & gold styling and verify date.",
    category: "wedding",
    templateId: "hindu-royal-palace",
    coverStyle: "wax-seal-envelope",
    particleEffect: "rose-petals",
    planName: "Royal Experience",
    paymentStatus: "unpaid",
    activeFrom: "2026-11-22T00:00:00.000Z",
    expiresAt: "2027-01-22T23:59:59.000Z",
    maxViews: 1000,
    currentViews: 0,
    viewCount: 0,
    ogTitle: "Vikram & Pooja Grand Sangeet Celebration! 💃🕺",
    ogDescription: "Malhotra & Khanna family invite you to an evening of music, dance, and cocktails.",
    ogImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    hero: {
      mangalacharan: "॥ शुभम् भवतु ॥",
      primaryTitle: "TOGETHER WITH THEIR FAMILIES",
      groomOrHost: "Vikram",
      groomParents: "Son of Mr. Sanjeev & Mrs. Vandana Malhotra",
      brideOrCelebrant: "Pooja",
      brideParents: "Daughter of Mr. Sunil & Mrs. Renu Khanna",
      invitationText: "cordially invite you to an unforgettable Sangeet celebration",
      closingLine: "Malhotra & Khanna Families",
      heroImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
      sacredSymbol: "ganesha",
    },
    eventDate: "2027-04-17T19:00:00",
    eventDateDisplay: "Saturday, 17 April 2027",
    subEvents: [
      {
        id: "vs-1",
        title: "Grand Sangeet & Cocktails",
        date: "Sat, 17 Apr 2027",
        time: "07:00 PM onwards",
        venue: "The Oberoi Grand Ballroom, Mumbai",
        dressCode: "Glamorous Indian Festive",
        dressCodeColorHex: "#9333EA",
        iconName: "Music",
      },
    ],
    gallery: [],
    venue: {
      name: "The Oberoi Grand Ballroom",
      address: "Nariman Point, Mumbai, Maharashtra 400021",
      googleMapsUrl: "https://maps.google.com/?q=The+Oberoi+Mumbai",
    },
    rsvp: {
      whatsappNumber: "919876543210",
      contactPerson: "Vikram Malhotra",
    },
    createdAt: "2026-11-22T18:00:00.000Z",
    updatedAt: "2026-11-22T18:00:00.000Z",
  },
];

export function getInvitationLifecycleState(invite: Invitation): {
  state: 'active' | 'coming-soon' | 'expired' | 'draft' | 'archived';
  daysRemaining: number;
  viewsRemaining: number | null; // null if unlimited
  percentViewsUsed: number;
  reason?: string;
} {
  const now = new Date();
  const activeDate = invite.activeFrom ? new Date(invite.activeFrom) : null;
  const expireDate = invite.expiresAt ? new Date(invite.expiresAt) : null;
  const currentViews = invite.currentViews ?? invite.viewCount ?? 0;
  const maxViews = invite.maxViews ?? 0;

  if (invite.status === 'archived') {
    return { state: 'archived', daysRemaining: 0, viewsRemaining: 0, percentViewsUsed: 100, reason: 'Archived by Admin' };
  }
  if (invite.status === 'draft') {
    return { state: 'draft', daysRemaining: 0, viewsRemaining: 0, percentViewsUsed: 0, reason: 'Draft / Pending Review' };
  }
  if (invite.status === 'expired') {
    return { state: 'expired', daysRemaining: 0, viewsRemaining: 0, percentViewsUsed: 100, reason: 'Plan validity has concluded' };
  }

  // Check coming soon (before activeFrom)
  if (activeDate && !isNaN(activeDate.getTime()) && now < activeDate) {
    const diffMs = activeDate.getTime() - now.getTime();
    const daysUntilActive = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return { state: 'coming-soon', daysRemaining: daysUntilActive, viewsRemaining: maxViews, percentViewsUsed: 0, reason: 'Invitation scheduled to go live soon' };
  }

  // Check expiry by date
  if (expireDate && !isNaN(expireDate.getTime()) && now > expireDate) {
    return { state: 'expired', daysRemaining: 0, viewsRemaining: 0, percentViewsUsed: 100, reason: 'Validity period has ended' };
  }

  // Check expiry by max views
  if (maxViews > 0 && currentViews >= maxViews) {
    return { state: 'expired', daysRemaining: 0, viewsRemaining: 0, percentViewsUsed: 100, reason: 'Maximum guest view limit reached' };
  }

  // Active state
  let daysRemaining = 999;
  if (expireDate && !isNaN(expireDate.getTime())) {
    const diffMs = expireDate.getTime() - now.getTime();
    daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }

  const viewsRemaining = maxViews > 0 ? Math.max(0, maxViews - currentViews) : null;
  const percentViewsUsed = maxViews > 0 ? Math.min(100, Math.round((currentViews / maxViews) * 100)) : 0;

  return { state: 'active', daysRemaining, viewsRemaining, percentViewsUsed };
}

function migrateInvitation(inv: any): Invitation {
  const currentViews = typeof inv.currentViews === 'number' ? inv.currentViews : (inv.viewCount || 0);
  const now = new Date();

  // Normalize status
  let status: 'draft' | 'active' | 'live' | 'expired' | 'archived' = inv.status;
  if (status === 'live' as any) status = 'active';
  if (!status) status = 'active';

  // Dates
  const activeFrom = inv.activeFrom || inv.createdAt || new Date(Date.now() - 7 * 86400000).toISOString();
  let expiresAt = inv.expiresAt;
  if (!expiresAt) {
    const createdTime = inv.createdAt ? new Date(inv.createdAt).getTime() : Date.now();
    expiresAt = new Date(createdTime + 60 * 86400000).toISOString();
  }

  const maxViews = typeof inv.maxViews === 'number' ? inv.maxViews : 1000;
  const planName = inv.planName || (inv.isUnpaidDemo ? 'Starter' : 'Royal Experience');
  const paymentStatus = inv.paymentStatus || (inv.isUnpaidDemo ? 'unpaid' : 'paid');

  // Check automated expiry
  const expiryDate = new Date(expiresAt);
  if (status === 'active' && ((!isNaN(expiryDate.getTime()) && now > expiryDate) || (maxViews > 0 && currentViews >= maxViews))) {
    status = 'expired';
  }

  return {
    ...inv,
    status,
    activeFrom,
    expiresAt,
    maxViews,
    currentViews,
    viewCount: currentViews,
    planName,
    paymentStatus,
  };
}

async function ensureDataFile(): Promise<Invitation[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const content = await fs.readFile(DATA_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const migrated = parsed.map(migrateInvitation);
        // Persist if any migration happened
        await fs.writeFile(DATA_FILE, JSON.stringify(migrated, null, 2), "utf-8");
        return migrated;
      }
    } catch {
      // File doesn't exist or is invalid
    }
    // Write fresh seeds with migration
    const migratedSeeds = SEED_INVITATIONS.map(migrateInvitation);
    await fs.writeFile(DATA_FILE, JSON.stringify(migratedSeeds, null, 2), "utf-8");
    return migratedSeeds;
  } catch (error) {
    console.error("Failed to read/write invitations data:", error);
    return SEED_INVITATIONS.map(migrateInvitation);
  }
}

export async function getInvitations(): Promise<Invitation[]> {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const count = await InvitationModel.countDocuments();
      if (count === 0) {
        // Seed default templates
        const seeds = SEED_INVITATIONS.map(migrateInvitation);
        await InvitationModel.insertMany(seeds);
        return seeds;
      }
      const docs = await InvitationModel.find().sort({ createdAt: -1 }).lean();
      return docs.map((d: any) => ({
        ...d,
        id: d.id,
      })) as Invitation[];
    }
  } catch (error) {
    console.error("MongoDB getInvitations error, falling back to local JSON:", error);
  }

  return await ensureDataFile();
}

export async function getInvitationBySlug(slug: string): Promise<Invitation | null> {
  const normalizedSlug = slug.toLowerCase();

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      let doc = await InvitationModel.findOne({ slug: normalizedSlug }).lean();
      if (!doc) {
        // Check if database needs seeding
        const count = await InvitationModel.countDocuments();
        if (count === 0) {
          const seeds = SEED_INVITATIONS.map(migrateInvitation);
          await InvitationModel.insertMany(seeds);
          doc = await InvitationModel.findOne({ slug: normalizedSlug }).lean();
        }
      }
      if (!doc) return null;

      const item = { ...doc, id: doc.id } as unknown as Invitation;
      const lifecycle = getInvitationLifecycleState(item);

      if ((item.status === "active" || (item.status as any) === "live") && lifecycle.state === "expired") {
        await InvitationModel.updateOne({ slug: normalizedSlug }, { $set: { status: "expired" } });
        item.status = "expired";
      }

      return item;
    }
  } catch (error) {
    console.error("MongoDB getInvitationBySlug error, falling back to local JSON:", error);
  }

  const list = await ensureDataFile();
  const index = list.findIndex((item) => item.slug.toLowerCase() === normalizedSlug);
  if (index === -1) return null;

  const item = list[index];
  const lifecycle = getInvitationLifecycleState(item);

  // If status is active but lifecycle has expired, persist status = 'expired'
  if ((item.status === "active" || (item.status as any) === "live") && lifecycle.state === "expired") {
    item.status = "expired";
    item.updatedAt = new Date().toISOString();
    await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  }

  return item;
}

export async function getInvitationById(id: string): Promise<Invitation | null> {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const doc = await InvitationModel.findOne({ id }).lean();
      if (doc) return { ...doc, id: doc.id } as unknown as Invitation;
    }
  } catch (error) {
    console.error("MongoDB getInvitationById error, falling back to local JSON:", error);
  }

  const list = await ensureDataFile();
  const found = list.find((item) => item.id === id);
  return found || null;
}

export async function createInvitation(
  data: Omit<Invitation, "id" | "createdAt" | "updatedAt" | "viewCount" | "currentViews"> & { currentViews?: number }
): Promise<Invitation> {
  const id = `inv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const activeFrom = data.activeFrom || now;
  const expiresAt = data.expiresAt || new Date(Date.now() + 30 * 86400000).toISOString();
  const maxViews = typeof data.maxViews === "number" ? data.maxViews : 1000;
  const currentViews = data.currentViews || 0;

  const newInvite: Invitation = {
    ...data,
    id,
    activeFrom,
    expiresAt,
    maxViews,
    currentViews,
    viewCount: currentViews,
    planName: data.planName || "Royal Experience",
    paymentStatus: data.paymentStatus || (data.isUnpaidDemo ? "unpaid" : "paid"),
    createdAt: now,
    updatedAt: now,
  };

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      await InvitationModel.create(newInvite);
      return newInvite;
    }
  } catch (error) {
    console.error("MongoDB createInvitation error, falling back to local JSON:", error);
  }

  const list = await ensureDataFile();
  list.unshift(newInvite);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return newInvite;
}

export async function updateInvitation(id: string, updates: Partial<Invitation>): Promise<Invitation | null> {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const updatedDoc = await InvitationModel.findOneAndUpdate(
        { id },
        { $set: updates },
        { new: true }
      ).lean();
      if (updatedDoc) return { ...updatedDoc, id: updatedDoc.id } as unknown as Invitation;
    }
  } catch (error) {
    console.error("MongoDB updateInvitation error, falling back to local JSON:", error);
  }

  const list = await ensureDataFile();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const updated: Invitation = {
    ...list[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updated;
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return updated;
}

export async function deleteInvitation(id: string): Promise<boolean> {
  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const res = await InvitationModel.deleteOne({ id });
      return res.deletedCount > 0;
    }
  } catch (error) {
    console.error("MongoDB deleteInvitation error, falling back to local JSON:", error);
  }

  const list = await ensureDataFile();
  const filtered = list.filter((item) => item.id !== id);
  if (filtered.length === list.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export async function incrementViewCount(slug: string): Promise<number> {
  const normalizedSlug = slug.toLowerCase();

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      const doc = await InvitationModel.findOneAndUpdate(
        { slug: normalizedSlug },
        { $inc: { currentViews: 1, viewCount: 1 } },
        { new: true }
      ).lean();

      if (doc) {
        const curViews = doc.currentViews ?? 0;
        if (doc.maxViews && doc.maxViews > 0 && curViews >= doc.maxViews && (doc.status === "active" || (doc.status as any) === "live")) {
          await InvitationModel.updateOne({ slug: normalizedSlug }, { $set: { status: "expired" } });
        }
        return curViews;
      }
    }
  } catch (error) {
    console.error("MongoDB incrementViewCount error, falling back to local JSON:", error);
  }

  const list = await ensureDataFile();
  const item = list.find((inv) => inv.slug.toLowerCase() === normalizedSlug);
  if (!item) return 0;

  item.viewCount = (item.viewCount || 0) + 1;
  item.currentViews = (item.currentViews || 0) + 1;

  if (item.maxViews && item.maxViews > 0 && item.currentViews >= item.maxViews && (item.status === "active" || (item.status as any) === "live")) {
    item.status = "expired";
  }

  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
  return item.currentViews;
}
