import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Jeet Galani. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/jeetgalani999/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://www.linkedin.com/in/jeet-galani-811bb6345/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://x.com/jeet_galani" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
