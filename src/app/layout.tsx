import { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';

const pixeboy = localFont({
  src: '../utils/fonts/SciencePersonalUseOnly-JpG37.otf',
});
// Static metadata
export const metadata: Metadata = {
  title: "Guido's Blog",
  description: 'Personal Blog of programming',
  icons: {
    icon: 'logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pixeboy.className} antialiased dark:bg-primaryDark`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
