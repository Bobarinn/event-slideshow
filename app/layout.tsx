import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Creative Media Events Slideshow',
  description: 'Interactive slideshow of Creative Media Department events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

