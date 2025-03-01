import localFont from 'next/font/local';
import "./globals.css";
import { Providers } from "./providers";

const pixeboy = localFont({ src: '../utils/fonts/SciencePersonalUseOnly-JpG37.otf' })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pixeboy.className} antialiased dark:bg-primaryDark`}
      >
        <Providers>

        {children}
        </Providers>
      </body>
    </html>
  );
}
