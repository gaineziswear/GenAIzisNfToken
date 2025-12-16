"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HeartPulse, Loader2, Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { marketPulse } from "@/ai/flows/market-pulse";
import { textToSpeech } from "@/ai/flows/text-to-speech";

const formSchema = z.object({
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
});

export function MarketPulse() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState<string | null>(null);
  const [audioDataUri, setAudioDataUri] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "NVIDIA stock sentiment",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysis(null);
    setAudioDataUri(null);
    try {
      const pulseResult = await marketPulse(values);
      setAnalysis(pulseResult.analysis);

      toast({
        title: "Analysis Complete",
        description: "Generating audio summary...",
      });

      const ttsResult = await textToSpeech({ script: pulseResult.audioScript });
      setAudioDataUri(ttsResult.audioDataUri);

      toast({
        title: "Audio Summary Ready",
        description: "The market pulse audio report is now available.",
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not generate Market Pulse report.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <HeartPulse className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Market Pulse</CardTitle>
            </div>
            <CardDescription>
              Get a deep, audio-enhanced sentiment analysis on any financial topic.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 overflow-auto p-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Financial Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., TSLA stock, Bitcoin outlook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {analysis && (
              <div className="space-y-4 rounded-lg border bg-background p-4">
                <h4 className="font-semibold text-lg">Analysis Report</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis}</p>
                {audioDataUri && (
                    <div className="pt-4">
                        <h4 className="font-semibold text-lg mb-2">Audio Summary</h4>
                        <audio controls className="w-full">
                            <source src={audioDataUri} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mic className="mr-2 h-4 w-4" />
              )}
              Generate Pulse Report
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
