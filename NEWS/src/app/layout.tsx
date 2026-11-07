import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { Header } from '@/components/minimal/Header';
import { UrlAnalyzerModal } from '@/components/minimal/UrlAnalyzerModal';

export const metadata: Metadata = {
  title: 'The Naked Truth — Anti-Echo Chamber News Hub',
  description:
    'An ultra-minimalist, typography-driven news reader that isolates undeniable facts agreed on by both sides, and reveals partisan omissions using local quantized AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <UrlAnalyzerModal />
      </body>
    </html>
  );
}
