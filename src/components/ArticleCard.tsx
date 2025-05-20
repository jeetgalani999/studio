import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  dataAiHint: string;
  link: string;
  category: string;
  date: string;
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={article.imageUrl}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={article.dataAiHint}
        />
      </div>
      <CardHeader>
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <Badge variant="outline">{article.category}</Badge>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>
        <CardTitle className="text-xl">{article.title}</CardTitle>
        <CardDescription className="h-24 overflow-hidden text-ellipsis">
          {article.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter className="border-t pt-4">
        <Button asChild variant="link" className="p-0 text-primary">
          <Link href={article.link}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
