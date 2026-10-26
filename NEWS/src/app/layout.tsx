import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { Scene } from '@/components/canvas/Scene';
import { LensCursor } from '@/components/dom/LensCursor';
import { Header } from '@/components/dom/Header';

export const metadata: Metadata = {
  title: 'The Naked Truth | Anti-Echo Chamber News Reader',
  description:
    'Distill undeniable verified facts from polarizing news stories and expose media blindspots with a kinetic 3D WebGL experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Fixed 3D WebGL Background Canvas (Canvas Layer) */}
        <Scene />

        {/* GSAP-Powered "Lens of Truth" Custom Cursor */}
        <LensCursor />

        {/* Subtle Cyberpunk Scanlines Texture */}
        <div className="scanlines-overlay" />

        {/* HTML DOM Overlays (UI Layer) */}
        <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
