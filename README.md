# 💍 Interactive Digital Invitation Studio

An agency-grade, production-ready web application to create, customize, and sell **Next-Generation Interactive Digital Wedding & Event Invitations**. Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, **Canvas Confetti**, and a zero-dependency portable database layer.

---

## 🌟 Key Features

### 1. 3D Opening Covers
- **Wax-Seal Envelope:** Realistic 3D embossed envelope. Tapping the wax seal stamps pops/cracks the seal, flips the top flap (`rotateX(180deg)`), slides the card out, and begins background music with confetti.
- **3D Book Cover:** Royal hardcover flip in 3D perspective (`rotateY(-135deg)`).
- **Curtain Reveal:** Deep velvet curtains that smoothly part to the sides on tap.

### 2. Interactive Signature Sections
- **Physical "Pull-to-Reveal" Save The Date Scroll:** Guests physically drag/pull a golden tassel downward (with touch/pointer drag physics or 1-tap fallback) to unroll the royal Farman, revealing the date and triggering a celebratory confetti shower.
- **Live Flip Countdown:** Real-time Days, Hours, Minutes, and Seconds counter.
- **Add to Calendar (.ics):** Generates and downloads native calendar events for Google Calendar / Apple Calendar.
- **Swipeable Festivities Cards:** Horizontal snap cards with custom event icons, timings, venues, and visual **Dress Code Swatches**.
- **Memories Photo Gallery:** Arched photo cards with a **Tap-to-Zoom Lightbox View**.
- **1-Tap Google Maps Navigation:** Directions button that opens Google Maps GPS directly to the venue gate.
- **Interactive WhatsApp RSVP Form:** Lets guests enter their name, attending status, guest count, and personalized wishes, automatically formatting a WhatsApp message to the host.
- **Spinning Vinyl Music Player:** Floating gold disc that spins while playing background shehnai/flute music with smooth volume fade-in.

### 3. Business Protection & Monetization
- **Trial / Demo Watermark (`isUnpaidDemo`):** Diagonal "DEMO PREVIEW - NOT PAID" watermark so agencies can safely share preview links before clients pay.
- **HD Printable QR Code Generator:** 1-click generation and PNG download to print QR codes on traditional physical wedding cards and envelopes.
- **WhatsApp SSR Link Previews (Open Graph):** Server-rendered dynamic metadata so custom couple thumbnails and names appear in WhatsApp chats.

---

## 🚀 Live Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Commercial Agency Landing Page with pricing & interactive phone simulator |
| `/admin` | Password-protected admin dashboard (Default PIN: `7788`) |
| `/admin/login` | Security PIN login page |
| `/admin/new` | Multi-step invitation creation form |
| `/admin/edit/[id]` | Edit existing invitation details |
| `/invite/[slug]` | Public, mobile-first interactive invitation page |
| `/api/calendar/[slug]` | Dynamic `.ics` calendar file download |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS with custom luxury color palettes
- **Animations:** Framer Motion & Canvas Confetti
- **Typography:** Google Fonts (Cinzel, Playfair Display, Cormorant Garamond, Poppins)
- **Icons:** Lucide React
- **QR Codes:** QRCode.js (high-res PNG generation)
- **Data Layer:** Portable JSON/SQLite abstracted storage in `data/invitations.json` (Supabase-ready)

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js 18.x or 20.x+
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd "New Wedding Project"

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:
```env
ADMIN_PIN=7788
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Deployment Instructions

### Option 1: Deploy on Vercel (Recommended - 2 Minutes)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. In the **Environment Variables** section, add:
   - `ADMIN_PIN`: Set your desired secret PIN code (e.g. `9845`)
   - `NEXT_PUBLIC_APP_URL`: Set to your Vercel deployment URL (e.g. `https://your-studio.vercel.app`)
5. Click **"Deploy"**. Your studio will be live globally!

### Option 2: Deploy on Render / Railway / VPS (Docker / Node)
1. Connect your repository on Render or Railway.
2. Set Build Command: `npm run build`
3. Set Start Command: `npm run start`
4. Configure Environment Variables: `ADMIN_PIN` and `NEXT_PUBLIC_APP_URL`.

---

## 🔒 Security & Admin Access
- Access `/admin` and enter your configured security PIN (Default: `7788`).
- PIN verification issues a secure HTTP-only cookie session for 7 days.
- Change the PIN anytime in your environment variables.

---

## 📄 License
Commercial License — Digital Invitation Studio © 2026. All rights reserved.
