import { Button } from '@/components/ui/button';
import { ResumeDownloadButton } from '@/components/ResumeDownloadButton';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section id="home" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto flex max-w-screen-xl items-center justify-center px-4 md:px-6 lg:gap-16">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Hi, I&apos;m a Mobile App Developer
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            I specialize in crafting modern, responsive, and user-friendly applications.
            Let&apos;s build something amazing together.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#projects">View My Work</Link>
            </Button>
            <ResumeDownloadButton size="lg" variant="outline" />
          </div>
        </div>
      </div>
    </section>
  );
}
