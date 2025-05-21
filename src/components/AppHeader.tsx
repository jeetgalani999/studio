
'use client';

import Link from 'next/link'; // Keep for potential other uses, but nav links will be <a>
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const navItems = [
  { label: 'Home', path: '/', sectionId: 'home' },
  { label: 'Projects', path: '/projects', sectionId: 'projects' },
  { label: 'Contact', path: '/contact', sectionId: 'contact' },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const hash = window.location.hash;

    let targetSectionId = '';

    if (hash) {
      targetSectionId = hash.substring(1);
    } else {
      const item = navItems.find(navItem => navItem.path === currentPath);
      if (item) {
        targetSectionId = item.sectionId;
      } else if (currentPath === '/') {
        targetSectionId = 'home';
      }
    }

    if (targetSectionId) {
      // Delay slightly to ensure layout is stable, especially with animations
      const timer = setTimeout(() => {
        document.getElementById(targetSectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string, path: string) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="/" 
          onClick={(e) => handleScrollToSection(e, 'home', '/')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl font-bold">Jeet Galani</span>
        </a>

        {/* Desktop Navigation and Controls */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.path}
                onClick={(e) => handleScrollToSection(e, item.sectionId, item.path)}
                className="transition-colors hover:text-primary cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
           {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
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
                    <a
                      key={item.label}
                      href={item.path}
                      onClick={(e) => handleScrollToSection(e, item.sectionId, item.path)}
                      className="text-lg font-medium transition-colors hover:text-primary cursor-pointer"
                    >
                      {item.label}
                    </a>
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
