
'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname

const navItems = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'Projects', href: '/projects', sectionId: 'projects' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter(); // useRouter for programmatic navigation if needed
  const pathname = usePathname(); // usePathname to get current path

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleScrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href); // Update URL without page reload
    } else if (href === '/') {
      // Special case for home, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
    setIsMobileMenuOpen(false);
  };

  // Effect to scroll to section if path matches on initial load or popstate
  useEffect(() => {
    const currentNavItem = navItems.find(item => item.href === pathname && item.href !== '/');
    if (currentNavItem) {
      const element = document.getElementById(currentNavItem.sectionId);
      if (element) {
        // Slight delay to ensure layout is stable for scrolling
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    } else if (pathname === '/') {
        // If it's the root path and not a specific section, ensure top of page.
        // This might be redundant if HeroSection is already at the top.
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handlePopState = () => {
      const popStateNavItem = navItems.find(item => item.href === window.location.pathname && item.href !== '/');
      if (popStateNavItem) {
        document.getElementById(popStateNavItem.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else if (window.location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [pathname]);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={(e) => handleScrollToSection(e, '/', 'home')}
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
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href, item.sectionId)}
                className="transition-colors hover:text-primary"
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
                      href={item.href}
                      onClick={(e) => {
                        handleScrollToSection(e, item.href, item.sectionId);
                      }}
                      className="text-lg font-medium transition-colors hover:text-primary"
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
