'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { generateDescriptionAction } from '@/actions/generateDescriptionAction'; // Ensure this path is correct
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  projectName: z.string().min(2, { message: 'Project name must be at least 2 characters.' }),
  techStack: z.string().min(3, { message: 'Tech stack must be at least 3 characters.' }),
  keywords: z.string().min(3, { message: 'Keywords must be at least 3 characters.' }),
  projectSummary: z.string().min(10, { message: 'Summary must be at least 10 characters.' }).max(500, { message: 'Summary must not exceed 500 characters.' }),
});

type FormData = z.infer<typeof formSchema>;

export function AISummarizerSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      techStack: '',
      keywords: '',
      projectSummary: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const result = await generateDescriptionAction(values);
      if ('error' in result) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else {
        setGeneratedDescription(result.description);
        toast({
          title: 'Success!',
          description: 'Project description generated.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ai-summarizer" className="w-full py-12 md:py-20 lg:py-24 bg-secondary">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            AI Project Summarizer
          </h2>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            Generate a compelling project description using AI.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Describe Your Project</CardTitle>
              <CardDescription>Fill in the details below and let AI craft a summary for you.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., DevSpace Folio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tech Stack</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Next.js, TypeScript, Tailwind CSS" {...field} />
                        </FormControl>
                        <FormDescription>Comma-separated list of technologies.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keywords</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., portfolio, AI, responsive" {...field} />
                        </FormControl>
                        <FormDescription>Comma-separated list of keywords.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Briefly describe your project, its goals, and key features."
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Generate Description
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Generated Description</CardTitle>
              <CardDescription>Your AI-powered project summary will appear here.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[200px] rounded-md border border-dashed p-4">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Generating your description...</p>
                </div>
              )}
              {!isLoading && !generatedDescription && (
                <p className="text-muted-foreground text-center pt-16">
                  Your generated description will be shown here once you submit the form.
                </p>
              )}
              {generatedDescription && <p className="whitespace-pre-wrap">{generatedDescription}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
