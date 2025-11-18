# Haopeng Yu - Personal Academic Homepage

A modern, responsive personal academic homepage built with Vue 3, featuring interactive components, dark mode support, and comprehensive SEO optimization.

🔗 **Live Demo**: [https://atlasbioinfo.github.io/HYU/](https://atlasbioinfo.github.io/HYU/)

## ✨ Features

### Core Features
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Bilingual Support**: Switch between English and Chinese seamlessly
- **Interactive Animations**: Particle background effects and smooth scroll animations
- **SEO Optimized**: Comprehensive meta tags for search engines and social media

### Content Sections
- **Profile Section**:
  - Professional photo with animated gradient border
  - Personal introduction with typing animation
  - Social media links with icon buttons (Email, LinkedIn, X, Bluesky, Google Scholar, GitHub)

- **Academic Timeline**:
  - Education history
  - Employment experience
  - Research grants
  - Awards and fellowships

- **Publications**:
  - Interactive year-based filtering
  - Grouped by publication year
  - DOI links with external link icons
  - Hover effects and animations

- **Presentations**: Conference talks and poster presentations
- **Academic Service**: Peer review contributions, editorial board memberships, mentoring experience
- **Visitor Statistics**: Real-time page views and unique visitor counts

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Components**: [Naive UI](https://www.naiveui.com/)
- **Icons**: [Ionicons 5](https://ionic.io/ionicons)
- **Animations**: [tsParticles](https://particles.js.org/)
- **Analytics**: Busuanzi (不蒜子)
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
HYU/
├── public/
│   └── img/
│       └── hyu_photo.png          # Profile photo
├── src/
│   ├── assets/
│   │   └── style.css              # Global styles
│   ├── components/
│   │   ├── Awards.vue             # Awards section
│   │   ├── Education.vue          # Education section
│   │   ├── Employment.vue         # Employment section
│   │   ├── Grants.vue             # Grants section
│   │   ├── ParticlesBackground.vue # Animated background
│   │   ├── Presentations.vue      # Presentations section
│   │   ├── Publications.vue       # Publications with filtering
│   │   ├── AcademicService.vue    # Academic service section
│   │   └── VisitorStats.vue       # Visitor statistics
│   ├── data/
│   │   └── resume.json            # All content data (edit this!)
│   ├── App.vue                    # Main application component
│   └── main.js                    # Application entry point
├── index.html                     # HTML template with SEO meta tags
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/atlasbioinfo/HYU.git
cd HYU
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173/HYU/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Customization Guide

### 1. Update Personal Information

Edit `src/data/resume.json` to customize all content:

```json
{
  "personal": {
    "name": { "en": "Your Name", "cn": "你的名字" },
    "title": { "en": "Your Title", "cn": "你的头衔" },
    "subtitle": { "en": "Your Subtitle", "cn": "你的副标题" },
    "intro": { "en": "Your intro...", "cn": "你的介绍..." },
    "photo": "img/your_photo.png",
    "social": {
      "email": "your.email@example.com",
      "linkedin": "https://linkedin.com/in/yourprofile",
      "twitter": "https://twitter.com/yourhandle",
      "bluesky": "https://bsky.app/profile/yourhandle",
      "googleScholar": "https://scholar.google.com/citations?user=YOUR_ID",
      "github": "https://github.com/yourusername"
    }
  },
  "education": [...],
  "employment": [...],
  "grants": [...],
  "awards": [...],
  "presentations": [...],
  "publications": [...]
}
```

### 2. Replace Profile Photo

1. Place your photo in `public/img/`
2. Update the `photo` field in `resume.json`
3. Recommended size: 500x500px or larger (square format)

### 3. Update SEO Meta Tags

Edit `index.html` to update SEO information:

```html
<meta name="description" content="Your description here">
<meta name="keywords" content="your, keywords, here">
<meta property="og:title" content="Your Name - Your Title">
<meta property="og:url" content="https://yourdomain.com">
<meta name="twitter:creator" content="@yourhandle">
```

### 4. Customize Theme Colors

Edit CSS variables in `src/App.vue`:

```css
:root {
  --accent-primary: #0ea5e9;    /* Primary accent color */
  --accent-secondary: #8b5cf6;  /* Secondary accent color */
  --accent-tertiary: #ec4899;   /* Tertiary accent color */
}
```

### 5. Modify Base Path (for GitHub Pages)

If deploying to a different repository, update `vite.config.js`:

```javascript
export default defineConfig({
  base: '/your-repo-name/', // Change this
  // ...
})
```

## 📦 Deployment

### GitHub Pages (Recommended)

This project includes automatic deployment via GitHub Actions:

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at `https://yourusername.github.io/HYU/`

The workflow is defined in `.github/workflows/static.yml`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist/` directory to your hosting service of choice (Netlify, Vercel, etc.)

## 🎯 Key Components

### Publications Component
Located in `src/components/Publications.vue`, this component features:
- Year-based grouping and filtering
- Interactive filter tags with publication counts
- Smooth animations and transitions
- DOI links with icons

### Particles Background
The animated particle background (`src/components/ParticlesBackground.vue`) creates an engaging visual effect while maintaining good performance.

### Visitor Statistics
Real-time visitor tracking using Busuanzi (不蒜子) service, displayed in the footer.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available for personal and academic use. Feel free to fork and customize for your own academic homepage.

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Naive UI for the beautiful component library
- tsParticles for the interactive background effects
- All the open-source contributors

## 📧 Contact

**Haopeng Yu**
- Email: haopeng.yu@jic.ac.uk
- GitHub: [@atlasbioinfo](https://github.com/atlasbioinfo)
- Google Scholar: [Profile](https://scholar.google.com/citations?user=5OjpkakAAAAJ&hl=en)

---

⭐ If you find this project useful, please consider giving it a star!
