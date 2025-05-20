import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  liveLink?: string;
  repoLink?: string;
  techStack: string[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={project.dataAiHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>
        <CardDescription className="h-20 overflow-hidden text-ellipsis">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-4">
          <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Tech Stack:</h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t pt-4">
        {project.liveLink && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
        )}
        {project.repoLink && (
          <Button asChild variant="default" size="sm">
            <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> Repository
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
