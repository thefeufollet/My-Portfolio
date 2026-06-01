# Camille Darley — Portfolio

Personal portfolio website for **Camille Darley**, a bioinformatics PhD student at George Mason University and Professional AI Trainer. Built with Next.js and Tailwind CSS.

## Live site

> Add your deployed URL here after publishing, e.g. `https://your-portfolio.vercel.app`

## Features

- **Home** — Hero section, profile photo, quick stats, social links, and contact
- **About** — Background, focus areas, and skills
- **Projects** — Project cards with live demo and GitHub links
- Responsive layout with mobile navigation
- Purple and teal color theme
- Centralized site config for easy updates

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.18 or later
- npm

### Installation

```bash
git clone https://github.com/thefeufollet/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Customization

Most site content lives in a single config file:

**`lib/site.ts`**

Update this file to change:

| Field | Description |
|-------|-------------|
| `name`, `title`, `email`, `location` | Personal info |
| `linkedin`, `github` | Social profile URLs |
| `photo` | Path to profile image (default: `/images/profile.jpg`) |
| `projects` | Project titles, descriptions, tags, and links |

Each project supports two link fields:

- **`url`** — Live demo, paper, or project page
- **`github`** — GitHub repository URL

Links set to `#` appear disabled until you replace them with real URLs.

### Profile photo

Add your photo to:

```
public/images/profile.jpg
```

Recommended: square image, at least 512×512 px. If no image is found, a placeholder with your initials is shown.

## Project structure

```
portfolio/
├── app/
│   ├── layout.tsx       # Root layout, fonts, header/footer
│   ├── page.tsx         # Home page
│   ├── about/page.tsx   # About page
│   ├── projects/page.tsx
│   └── globals.css      # Tailwind + custom styles
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProfilePhoto.tsx
│   ├── ProjectCard.tsx
│   ├── ContactSection.tsx
│   ├── SkillsSection.tsx
│   └── FocusAreas.tsx
├── lib/
│   └── site.ts          # Site content & project data
└── public/
    └── images/          # Static assets (profile photo)
```

## Deployment

This app works well on [Vercel](https://vercel.com/) (creators of Next.js):

1. Push the repo to GitHub
2. Import the project in Vercel
3. Deploy — no extra configuration required

Other platforms that support Next.js (Netlify, Cloudflare Pages, etc.) also work.

## Contact

- **Email:** [camilledarleypi@gmail.com](mailto:camilledarleypi@gmail.com)
- **LinkedIn:** [linkedin.com/in/camilledarley](https://www.linkedin.com/in/camilledarley/)
- **GitHub:** [github.com/thefeufollet](https://github.com/thefeufollet)

## License

This project is private/personal. All rights reserved.
