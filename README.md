# Creative Media Events Slideshow

A stunning, full-screen presentation slideshow for Creative Media Department events. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

![Creative Media Events Slideshow](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## Features

- 🎨 **Creative Modern Design** - Beautiful, professional slideshow with dynamic color palettes
- 🖼️ **Dynamic Image Support** - Automatically loads images from `/public/event-images/`
- ⌨️ **Keyboard Navigation** - Arrow keys to navigate, F for fullscreen, Escape to exit
- 📱 **Responsive Design** - Works beautifully on all screen sizes
- 🎭 **Smooth Animations** - Powered by Framer Motion for fluid transitions
- 🎯 **Difficulty Badges** - Visual indicators for event difficulty levels
- 🖥️ **Full-Screen Mode** - Perfect for presentations
- 📋 **Grid View** - View all slides at once with sorting options (index, alphabetical, difficulty)
- 🎯 **Auto-Hide Controls** - Navigation controls automatically hide after 5 seconds of inactivity
- 🖱️ **Click to View All** - Click anywhere on a slide to open the grid view
- 🧪 **Experimental Editor** - Visit `/editor` to try the AI-assisted slide builder MVP

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Image Setup

1. Place your event images in the `/public/event-images/` folder
2. Name them according to the event number:
   - `1.jpg` or `1.png` for Event #1
   - `2.jpg` or `2.png` for Event #2
   - And so on...

### Image Specifications

- **Recommended Size**: 1920x1080px (16:9) or 1200x1200px (square)
- **Formats**: JPG or PNG
- **Aspect Ratio**: The slideshow will handle any aspect ratio, but square or landscape works best

## Navigation

- **Arrow Right / Down**: Next slide
- `/editor` – AI-powered slide builder MVP (new)
- **Arrow Left / Up**: Previous slide
- **F Key**: Toggle fullscreen
- **Escape**: Exit fullscreen
- **Click Navigation Dots**: Jump to specific slide
- **Click Prev/Next Buttons**: Navigate slides

## Project Structure

```
event-slideshow/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page with navigation
├── components/
│   └── EventSlide.tsx       # Main slide component
├── data/
│   └── events.ts            # Events database
├── public/
│   └── event-images/        # Event images folder
└── package.json
```

## Customization

### Colors

The slideshow uses dynamic color palettes that rotate based on the event index. You can customize these in `components/EventSlide.tsx`:

```typescript
const colorPalettes = [
  { primary: 'from-violet-600...', ... },
  // Add more palettes
];
```

### Events Data

Edit `/data/events.ts` to modify event information, add new events, or update descriptions.

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React** - UI library

## License

MIT

