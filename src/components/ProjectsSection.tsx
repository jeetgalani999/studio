import { ProjectCard, type Project } from '@/components/ProjectCard';

const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, cart functionality, and secure payments.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'online shopping',
    liveLink: '#',
    repoLink: '#',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management tool to help teams organize and track their work efficiently.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'productivity tool',
    liveLink: '#',
    repoLink: '#',
    techStack: ['React', 'Firebase', 'Node.js', 'Material UI'],
  },
  {
    id: '3',
    title: 'AI Powered Blog',
    description: 'A content platform that uses AI to suggest topics and generate article outlines.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'artificial intelligence writing',
    liveLink: '#',
    repoLink: '#',
    techStack: ['Python', 'Flask', 'OpenAI API', 'Vue.js'],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Featured Projects
          </h2>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            A selection of my recent work.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
