import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Import GeistSans from the geist package
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';

// The GeistSans object from 'geist/font/sans' directly provides .variable and .className
// No need to call it as a function like with next/font/google

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
      {/* Use GeistSans.variable directly */}
      <body className={`${GeistSans.variable} font-sans antialiased`}>
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
