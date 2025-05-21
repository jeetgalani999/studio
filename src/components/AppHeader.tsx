
'use client';

import Link from 'next/link';
import Image from 'next/image'; // Added for the logo
import { Menu, Moon, Sun, X } from 'lucide-react'; // Removed Code from imports
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-2">
          {/* <Code className="h-8 w-8 text-primary" /> Removed Code icon */}
          <span className="text-xl font-bold">Jeet Galani</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm font-medium"> {/* Reduced gap from 6 to 4 to accommodate logo */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/portfolio-9890d.appspot.com/o/logo.jpeg?alt=media&token=bcbc90c6-e960-4262-9b40-6f47337f1b74"
            alt="Logo"
            width={32}
            height={32}
            data-ai-hint="logo"
            className="ml-2" // Added some margin for spacing from nav items
          />
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </nav>

        <div className="md:hidden flex items-center">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/portfolio-9890d.appspot.com/o/logo.jpeg?alt=media&token=bcbc90c6-e960-4262-9b40-6f47337f1b74"
            alt="Logo"
            width={32}
            height={32}
            data-ai-hint="logo"
            className="mr-2"
          />
           {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="mr-2">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="self-end mb-4"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
