import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} DevSpace Folio. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
