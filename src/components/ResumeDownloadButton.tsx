import { Button, type ButtonProps } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function ResumeDownloadButton(props: ButtonProps) {
  return (
    <Button asChild {...props}>
      <a href="https://drive.google.com/file/d/1LPnAHsG1WHUxjRC9LeYBJzfSX0_G17BI/view?usp=sharing" target="_blank" rel="noopener noreferrer">
        <Download className="mr-2 h-4 w-4" />
        View Resume
      </a>
    </Button>
  );
}
