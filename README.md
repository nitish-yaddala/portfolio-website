# Security Engineer Portfolio Website

A modern, hacker-themed portfolio website for Muni Nitish Kumar Yaddala, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Hacker-themed Design**: Clean terminal aesthetic with neon accents and subtle animations
- **Responsive Layout**: Fully responsive design optimized for mobile, tablet, and desktop
- **Interactive Terminal Panel**: Animated terminal commands that reveal portfolio sections
- **Performance Optimized**: Built with Next.js 14 App Router for optimal performance
- **Accessible**: Semantic HTML, ARIA labels, and proper heading hierarchy
- **SEO Friendly**: Complete meta tags and OpenGraph support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── About.tsx           # About section
│   ├── Contact.tsx         # Contact form
│   ├── Experience.tsx      # Work experience timeline
│   ├── Hero.tsx            # Hero section
│   ├── Metrics.tsx         # Key metrics display
│   ├── Navigation.tsx      # Sticky navigation
│   ├── Projects.tsx        # Projects showcase
│   ├── Skills.tsx          # Skills with collapsible categories
│   ├── TerminalPanel.tsx   # Interactive terminal
│   ├── ThemeProvider.tsx   # Theme context
│   ├── ToolingSnapshot.tsx # Tools and standards display
│   ├── Workflow.tsx        # Security assessment workflow
│   └── Writing.tsx         # Publications and writeups
├── data/
│   └── resume.ts           # Resume data model
└── public/                  # Static assets (if any)
```

## Customization

### Updating Resume Data

Edit `data/resume.ts` to update your information. All content is sourced from this file to ensure consistency.

### Styling

- Theme colors are defined in `tailwind.config.ts`
- Custom animations and utilities are in `app/globals.css`
- Component-specific styles use Tailwind utility classes

### Adding Sections

1. Create a new component in `components/`
2. Add it to `app/page.tsx`
3. Update navigation in `components/Navigation.tsx` if needed

## Deployment

### Step 1: Push to GitHub

**Option A: Using Git Command Line**

1. **Install Git** (if not installed): https://git-scm.com/download/win

2. **Open terminal in the portfolio-website directory**:
   ```bash
   cd "C:\Users\ynikk\Downloads\Job Hunt\portfolio-website"
   ```

3. **Initialize Git and push**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` with your GitHub username.

**Option B: Using GitHub Desktop**

1. Download GitHub Desktop: https://desktop.github.com/
2. File → Add Local Repository
3. Browse to: `C:\Users\ynikk\Downloads\Job Hunt\portfolio-website`
4. Click "Publish repository"

### Step 2: Deploy to Vercel (Recommended)

1. Go to https://vercel.com and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"
6. Your site will be live in minutes!

### Other Hosting Options

- **Netlify**: Similar to Vercel, import from GitHub
- **GitHub Pages**: Requires static export (see DEPLOYMENT.md)
- **AWS Amplify**: Import from GitHub repository

## Configuration

### Domain & SEO
- Update your domain in `config/site.ts`
- OG image: Open `generate-og-image.html` in a browser, generate the image, and save as `public/og-image.png` (1200x630px)

### Profile Picture
- Add your profile picture as `public/profile.jpg` (or `.png`)
- Recommended size: Square image (at least 512x512px for best quality)
- The image will appear in:
  - Navigation bar (small avatar, 40x40px)
  - Profile section between Hero and About (large, 192-256px depending on screen size)
- If the image is missing, initials "NY" will be displayed as a fallback

### Analytics (Optional)
Create `.env.local` in the project root:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Optional: Google Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com  # Optional: Plausible Analytics
```

## Notes

- Contact form uses Resend API for email delivery. See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for configuration.
- Resume PDF is located at `public/resume.pdf`
- All content is managed in `data/resume.ts`

## License

This project is for personal portfolio use.
