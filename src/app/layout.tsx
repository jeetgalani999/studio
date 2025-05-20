import type { Metadata } from 'next';
import { GeistSans } from 'next/font/google'; // Corrected import for GeistSans
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider'; // Added ThemeProvider

const geistSans = GeistSans({ // Corrected initialization
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevSpace Folio - App Developer Portfolio',
  description: 'Portfolio of an App Developer showcasing projects, skills, and articles.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-grow">{children}</main>
            <AppFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
