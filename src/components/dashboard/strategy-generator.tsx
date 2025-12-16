"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { GenerateTradingStrategyOutput } from "@/ai/flows/generate-trading-strategy";
import { generateTradingStrategy } from "@/ai/flows/generate-trading-strategy";

const formSchema = z.object({
  assetType: z.enum(["crypto", "options", "forex"]),
  riskAppetite: z.enum(["low", "medium", "high"]),
  marketData: z.string().min(1, { message: "Required" }),
  technicalIndicators: z.string().min(1, { message: "Required" }),
  macroeconomicFactors: z.string().min(1, { message: "Required" }),
});

export function StrategyGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<GenerateTradingStrategyOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marketData: "BTC showing high volatility, volume increasing.",
      technicalIndicators: "RSI is overbought at 75 on the 4H chart. MACD crossover is bearish.",
      macroeconomicFactors: "Upcoming CPI data release expected to cause market turbulence.",
      assetType: "crypto",
      riskAppetite: "medium",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateTradingStrategy(values);
      setResult(response);
      toast({
        title: "Strategy Generated",
        description: "AI has created a new trading strategy for you.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Could not generate a strategy. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-md">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Strategy AI</CardTitle>
            </div>
            <CardDescription>
              Generate trading strategies powered by AI analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 overflow-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="assetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an asset type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                        <SelectItem value="options">Options</SelectItem>
                        <SelectItem value="forex">Forex</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="riskAppetite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Appetite</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk appetite" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="marketData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Market Data</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Real-time market data..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="technicalIndicators"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technical Indicators</FormLabel>
                  <FormControl>
                    <Textarea placeholder="RSI, MACD, Bollinger Bands..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="macroeconomicFactors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Macroeconomic Factors</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Fed announcements, CPI data..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {result && (
              <div className="space-y-4 rounded-lg border bg-background p-4">
                <h4 className="font-semibold text-lg">Generated Strategy</h4>
                <div className="space-y-2">
                    <p className="font-medium">Strategy:</p>
                    <p className="text-sm text-muted-foreground">{result.strategy}</p>
                </div>
                 <div className="space-y-2">
                    <p className="font-medium">Rationale:</p>
                    <p className="text-sm text-muted-foreground">{result.rationale}</p>
                </div>
                 <div className="space-y-2">
                    <p className="font-medium">Risk Assessment:</p>
                    <p className="text-sm text-muted-foreground">{result.riskAssessment}</p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Strategy
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
