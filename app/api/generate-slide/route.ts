import { NextResponse } from 'next/server';
import { SlideData, SlideElement } from '@/types/slide';

const PALETTES = [
  {
    background: 'linear-gradient(135deg, #020617, #0f172a 60%, #1d4ed8)',
    accent: '#38bdf8',
    text: '#f8fafc',
  },
  {
    background: 'linear-gradient(125deg, #1e1b4b, #7c3aed)',
    accent: '#f472b6',
    text: '#f3e8ff',
  },
];

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];

  const slide: SlideData = {
    id: `slide-${Date.now()}`,
    name: prompt?.slice(0, 48) || 'Generated Slide',
    background: palette.background,
    width: 1920,
    height: 1080,
    elements: buildElements(prompt ?? 'New Narrative', palette),
  };

  return NextResponse.json({ slide });
}

function buildElements(prompt: string, palette: (typeof PALETTES)[number]): SlideElement[] {
  const title: SlideElement = {
    id: 'ai-title',
    type: 'text',
    position: { x: 160, y: 140 },
    size: { width: 1400, height: 150 },
    zIndex: 2,
    style: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 700,
      fontSize: 88,
      color: palette.text,
      letterSpacing: 1,
    },
    content: prompt || 'Vision Slide',
  };

  const description: SlideElement = {
    id: 'ai-description',
    type: 'text',
    position: { x: 160, y: 320 },
    size: { width: 900, height: 200 },
    zIndex: 2,
    style: {
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      fontSize: 34,
      lineHeight: 1.4,
      color: 'rgba(248, 250, 252, 0.85)',
    },
    content:
      '• Key opportunity  • Creative direction  • Impact highlight\nDesign cue: bold typography, soft gradients, glassmorphism cards.',
  };

  const cardBaseY = 580;
  const cards: SlideElement[] = ['Strategy', 'Design', 'Delivery'].map((label, index) => ({
    id: `ai-card-${index}`,
    type: 'shape',
    position: { x: 160 + index * 380, y: cardBaseY },
    size: { width: 320, height: 320 },
    zIndex: 2,
    style: {
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      borderRadius: 32,
      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.45)',
      padding: 32,
    },
    content: `${label}\n• Insight\n• Action\n• Metric`,
  }));

  const accent: SlideElement = {
    id: 'ai-accent',
    type: 'shape',
    position: { x: 1340, y: 160 },
    size: { width: 420, height: 420 },
    zIndex: 1,
    style: {
      backgroundColor: palette.accent,
      borderRadius: 210,
      opacity: 0.25,
      boxShadow: '0 30px 80px rgba(56, 189, 248, 0.45)',
    },
  };

  return [title, description, accent, ...cards];
}


