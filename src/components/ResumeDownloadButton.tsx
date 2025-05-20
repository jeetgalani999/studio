import { Button, type ButtonProps } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function ResumeDownloadButton(props: ButtonProps) {
  return (
    <Button asChild {...props}>
      <a href="/resume.pdf" download="YourName_Resume.pdf">
        <Download className="mr-2 h-4 w-4" />
        Download Resume
      </a>
    </Button>
  );
}
