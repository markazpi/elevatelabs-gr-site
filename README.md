# ElevateLabs - AI Automation Agency

Modern, responsive website for ElevateLabs, a Greek AI automation agency specializing in AI chatbots, workflow automation, and custom AI solutions.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Features:** Cookie consent management, animated canvas background, contact form with webhook integration

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**

   Create or update `.env.local` with your webhook configuration:
   ```
   VITE_N8N_WEBHOOK_URL=your_webhook_url_here
   VITE_WEBHOOK_SECRET=your_webhook_secret_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

- `/components` - React components
- `/utils` - Utility functions (cookie consent)
- `App.tsx` - Main application component with canvas animation and form logic
- `constants.tsx` - Site constants and content data
- `types.ts` - TypeScript type definitions

## Features

- Responsive design optimized for mobile and desktop
- GDPR-compliant cookie consent system
- Interactive particle animation background
- Contact form with spam protection (honeypot)
- Form submission cooldown to prevent abuse
- Smooth scrolling navigation
- Dark mode design
