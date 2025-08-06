# Modern Link-in-Bio Website

A beautiful, feature-rich link-in-bio website similar to Linktree, built with React, TypeScript, and Tailwind CSS.

## Features

### ✨ Core Features
- **Modern Profile Section**: Animated profile image, name, bio, and social media icons
- **Interactive Link Buttons**: Smooth hover effects and click animations
- **Dark/Light Mode Toggle**: Automatic theme detection with manual override
- **Contact Form Modal**: Built-in contact form with email integration
- **QR Code Generator**: Easy sharing with downloadable QR codes
- **Visit Counter**: Analytics-ready structure with view tracking
- **Fully Responsive**: Mobile-first design that works on all devices

### 🎨 Design Elements
- **Glassmorphism Effects**: Modern transparent backgrounds with blur effects
- **Smooth Animations**: Micro-interactions and hover states throughout
- **Professional Color Palette**: Carefully chosen colors for maximum impact
- **Typography Hierarchy**: Clean, readable fonts with proper spacing
- **Responsive Breakpoints**: Optimized for mobile, tablet, and desktop

### 🛠 Technical Features
- **JSON Configuration**: Easy customization through config files
- **TypeScript**: Full type safety for better development experience
- **Modular Components**: Clean, reusable component architecture
- **Local Storage**: Persistent theme and analytics data
- **Performance Optimized**: Fast loading with efficient rendering

## Quick Start

1. **Customize Your Profile**: Edit `src/config/profile.ts` to add your information
2. **Update Links**: Modify the `links` array with your personal/professional pages
3. **Add Social Media**: Configure your social media accounts in `socialLinks`
4. **Customize Design**: Adjust colors, backgrounds, and styling as needed

## Configuration

### Profile Setup
```typescript
export const profileConfig: ProfileConfig = {
  name: "Your Name",
  bio: "Your bio description",
  profileImage: "https://your-image-url.com/image.jpg",
  backgroundType: "gradient", // or "image"
  backgroundValue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  // ... more config options
}
```

### Adding Links
```typescript
links: [
  {
    id: "portfolio",
    title: "Portfolio",
    url: "https://your-portfolio.com",
    description: "View my latest projects",
    icon: "Briefcase",
    featured: true // Highlights the link
  }
]
```

### Social Media Links
```typescript
socialLinks: [
  { platform: "GitHub", url: "https://github.com/username", icon: "Github" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/username", icon: "Linkedin" }
]
```

## Customization

### Themes
The app supports automatic dark/light mode detection and manual theme switching. Themes are persisted in localStorage.

### Analytics
Built-in analytics track:
- Total page views
- Individual link clicks
- Last updated timestamp

### Background Options
Choose between:
- **Gradient backgrounds**: CSS gradients for modern looks
- **Image backgrounds**: Custom background images with overlays

### Icons
Uses Lucide React icons. Available icons include:
- `Briefcase`, `BookOpen`, `FileText`, `Play`, `Mail`, `ShoppingBag`
- `Github`, `Linkedin`, `Twitter`, `Instagram`, `Youtube`

## Deployment

The app is a standard React SPA that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this for personal or commercial projects!