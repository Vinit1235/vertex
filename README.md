# VORTEX 2025 🌀

> **Enter the Upside Down** - A Stranger Things themed Event Registration Landing Page

![Vortex Banner](https://via.placeholder.com/1200x400/8B0000/FFFFFF?text=VORTEX+2025)

## 🎬 Overview

VORTEX is a 36-hour hackathon and college fest experience inspired by Stranger Things. This landing page features an immersive 80s aesthetic with interactive elements, glassmorphism design, and creative animations.

## ✨ Features

### Core Sections
- ⏱️ **Countdown Timer** - Live countdown to event date
- 🎯 **Why Attend** - Event highlights and key benefits
- 👥 **Who Is This For** - Target audience profiles
- 🌀 **6 Unique Tracks** - AI, Web3, Cybersecurity, BCI, AR/VR, IoT
- 📅 **Schedule Timeline** - Interactive 2-day event schedule
- 🎤 **Speakers & Mentors** - Expert profiles with social links
- 📝 **Registration Form** - Multi-step form with validation
- ❓ **FAQ Section** - Expandable questions
- 🤝 **Sponsors** - Tiered sponsor display
- 🦶 **Footer** - With Christmas lights animation

### Creative Features
1. 🔀 **Reality Toggle** - Switch between Normal World & Upside Down modes
2. 🗺️ **Hawkins Map** - Interactive radar map with locations
3. 🧠 **Eleven's Powers** - Telekinetic object dragging game
4. 🎄 **Joyce's Light Wall** - Spell messages with Christmas lights
5. ⚡ **Lightning Effects** - Random flashes in Upside Down mode
6. 📺 **CRT Scanlines** - Retro TV effect overlay
7. ✨ **Particle System** - Floating spores/dust animation
8. 🎮 **Konami Code** - ↑↑↓↓←→←→BA reveals "011"
9. 🏆 **Achievement System** - Unlockable achievements
10. 🌟 **Glitch Effects** - Title text glitch on hover

### UI/UX
- 🪟 **Glassmorphism** - Modern frosted glass design
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Dark Theme** - Eye-friendly dark mode
- ⌨️ **Keyboard Shortcuts** - Press 'U' to toggle worlds
- 🔄 **Smooth Animations** - Framer Motion powered

## 🛠️ Tech Stack

- **React 18** + **TypeScript** - Modern frontend
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hook Form** - Form handling

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment (Vercel)

1. Push to GitHub
2. Import to Vercel
3. Deploy automatically ✅

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

## 🎨 Image Placeholders

The project includes placeholder prompts for AI image generation. Use these with Midjourney, DALL-E, or Stable Diffusion:

### Hero Background
```
Cinematic hackathon venue with red neon lights, 80s retro aesthetic, 
dark atmosphere with floating particles, Stranger Things inspired
```

### Speaker Portraits
```
Professional headshot, [description], dark background with subtle 
red glow, futuristic tech setting
```

### Event Promo
```
Group of diverse hackers coding together, red and blue lighting, 
glowing computer screens in dark room, 80s retro style
```

## 🎮 Easter Eggs

1. **Eleven Achievement** - Click the main title 11 times
2. **Konami Code** - Enter ↑↑↓↓←→←→BA for "011" reveal
3. **Secret Hunter** - Find 5 hidden secrets
4. **Light Wall** - Spell "RUN", "HELP", or "ELEVEN"
5. **Footer Logo** - Click 5 times for secret

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Tracks.tsx
│   ├── Schedule.tsx
│   ├── Speakers.tsx
│   ├── Registration.tsx
│   ├── FAQ.tsx
│   ├── Sponsors.tsx
│   ├── Footer.tsx
│   ├── LoadingScreen.tsx
│   ├── effects/
│   │   ├── ParticleSystem.tsx
│   │   ├── LightningEffect.tsx
│   │   └── CRTEffect.tsx
│   └── interactive/
│       ├── HawkinsMap.tsx
│       ├── TelekinesisMode.tsx
│       ├── LightWall.tsx
│       └── KonamiCode.tsx
├── context/
│   └── ThemeContext.tsx
├── data/
│   └── eventData.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎯 Customization

### Change Event Details
Edit `src/data/eventData.ts`:
```typescript
export const EVENT_CONFIG = {
  name: "YOUR EVENT NAME",
  date: new Date('2025-MM-DD'),
  venue: "Your Venue",
  // ...
};
```

### Modify Tracks
Update the `TRACKS` array in `eventData.ts`

### Add Speakers
Add to the `SPEAKERS` array with image prompts

## 📄 License

MIT License - Feel free to use for your events!

---

Made with ❤️ and 🧇 Eggo Waffles

*"Friends don't lie."* - Eleven
