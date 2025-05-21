import { HeroSection } from '@/components/HeroSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AISummarizerSection } from '@/components/AISummarizerSection';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <AISummarizerSection />
      <ContactSection />
    </>
  );
}
