import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display, Cairo } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Monipack. Disposable and food packaging, Nizwa, Oman',
  description: 'Morooj Nizwa International Company LLC (Monipack) - leading manufacturer and distributor of disposable food packaging across Oman since 2009.',
  icons: {
    icon: 'https://www.monipack.com/gallery_gen/1fcdde1763e767179df5c598beabde31_629x508.91818181818.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} ${cairo.variable}`}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
