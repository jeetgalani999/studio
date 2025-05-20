import { ArticleCard, type Article } from '@/components/ArticleCard';

const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Web Development with AI',
    summary: 'Exploring how artificial intelligence is reshaping the landscape of web development, from automated coding to personalized user experiences.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'technology future',
    link: '#',
    category: 'Web Development',
    date: '2024-07-15',
  },
  {
    id: '2',
    title: 'Mastering Responsive Design in 2024',
    summary: 'A deep dive into modern techniques and best practices for creating truly responsive and adaptive web interfaces.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'web design mobile',
    link: '#',
    category: 'UI/UX Design',
    date: '2024-06-28',
  },
  {
    id: '3',
    title: 'Case Study: Building a Scalable E-commerce API',
    summary: 'Detailed walkthrough of the architecture and challenges faced while developing a high-performance API for an e-commerce platform.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'server code',
    link: '#',
    category: 'Backend Development',
    date: '2024-05-10',
  },
];

export function ArticlesSection() {
  return (
    <section id="articles" className="w-full py-12 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Insights & Articles
          </h2>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            Sharing my thoughts, experiences, and case studies.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sampleArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
