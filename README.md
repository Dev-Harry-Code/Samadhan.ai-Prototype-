# 🌐 Samadhan.AI (समाधान)
### Intelligent Civic Crowdsourcing & Social Problem-Solving Platform

![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Samadhan.AI** is a community-driven civic engagement platform that connects proactive citizens, verified NGOs, and CSR entities with autonomous AI triage to detect, fund, and solve community challenges with verifiable on-ground impact.

---

## ✨ Key Features

### 🔮 1. Finfoco / Boltshift Dark Glassmorphism UI
- **Ambient Neon Glows**: Built with deep backgrounds (`#080a0f`), translucent glassmorphism cards (`backdrop-blur-xl`), and floating ambient orbs in Neon Purple, Fuchsia, and Cyan.
- **3-in-1 Theme Switcher**: Instant switching between:
  - 🌙 **Neon Dark (Default)**: Sleek SaaS aesthetic with glowing purple accents.
  - ☀️ **Modern Light**: Clean, frosted glass cards with soft drop shadows.
  - 🌲 **Cyber Emerald**: High-contrast midnight-teal theme.

### 🖥️ 2. Desktop & Mobile Viewport Mode Toggle
- Built directly into the top navigation bar.
- **Desktop Mode**: Full-width, multi-column SaaS dashboard.
- **Mobile Mode**: Wraps the app in a realistic smartphone mockup frame with bottom navigation and a centered floating report button.

### 📊 3. Interactive Bento-Box Widgets
- **Overall Platform Stats**: Real-time counters for Resolved Issues, Active Volunteers, CSR Funds Deployed (in **₹ Indian Rupees**), and AI Accuracy.
- **Community Impact Analytics**: Dual-bar time visualization comparing submitted vs. verified civic solutions with time filters (*This Month*, *Quarter*, *Year*).
- **Sector Distribution Gauge**: SVG arc gauge mapping issues across Water Resources, Sanitation, Roads, and Energy.
- **Top Ranked Volunteers Leaderboard**: Live Karma ranking, volunteer avatars, XP progress bars, and achievement badges.
- **Recent Issues Mini-Feed**: Real-time civic challenge cards with status pills, distance tags, and upvote counters.

### 🔐 4. Multi-Step Authentication & Role Selection
- Choice of **Mobile (SMS OTP)** or **Gmail (Verification Code)**.
- Granular Role Selection:
  - 👤 **Citizen / Volunteer**: Report local issues, upvote, and comment.
  - 🛡️ **NGO / Non-Profit**: Lead on-ground implementation.
  - 🏢 **Company / CSR Sponsor**: Fund civic initiatives and monitor ESG metrics.

### 💬 5. Issue Discussions & Photo Reporting
- **Dedicated Issue Details Screen**: High-resolution image headers, location metadata, impact counters, and an interactive commenting interface.
- **Photo Report Flow**: Capture evidence photos with auto-detected GPS location tags.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, HTML5, CSS3
- **Styling**: Tailwind CSS, Custom Glassmorphism Utilities
- **Build Tool**: Vite 6, esbuild-wasm
- **Icons**: Lucide & Custom SVG Vectors

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/akshatmehta016/Samadhan.ai-Prototype-.git
   cd Samadhan.ai-Prototype-
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:5173](http://localhost:5173) to explore the app.

---

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── common/         # Header, BottomNav
│   │   ├── screens/        # HomeScreen, AuthScreen, IssuesFeedScreen, IssueDetailsScreen, etc.
│   │   └── widgets/        # PlatformStatsWidget, CommunityImpactChart, TopVolunteersWidget, etc.
│   ├── data/               # Mock data for civic issues, volunteers & stats
│   ├── types/              # TypeScript types & interface definitions
│   ├── App.tsx             # Root state machine & view router
│   ├── main.tsx            # App entry point
│   └── index.css           # Tailwind & glassmorphism utilities
├── tailwind.config.js      # Custom neon colors, glows, animations
├── package.json
└── vite.config.ts
```

---

## 📄 License
This project is licensed under the **MIT License** — feel free to use and customize it for community initiatives!
