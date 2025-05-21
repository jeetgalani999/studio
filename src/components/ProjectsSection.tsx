
import { ProjectCard, type Project } from '@/components/ProjectCard';

const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'Service Provider App',
    description: 'A cross-platform mobile app for booking home services like cleaning, plumbing, and more. Developed client and provider modules, and integrated real-time chat using sockets.',
    techStack: ['Cross-Platform', 'Mobile App', 'Sockets', 'Real-time Chat'],
  },
  {
    id: '2',
    title: 'Social Media App',
    description: 'An interactive social media application with post creation, likes, comments, and user following. Includes direct messaging with real-time chat, built using Bloc for scalable state management.',
    techStack: ['Mobile App', 'Bloc State Management', 'Real-time Chat', 'Social Features'],
  },
  {
    id: '3',
    title: 'Event Planner App',
    description: 'A simple and intuitive Flutter app for managing personal events and reminders. Users can create event notes and view them on a calendar-based UI.',
    techStack: ['Flutter', 'Mobile App', 'Event Management', 'Calendar UI'],
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
