"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, Loader2, Sparkles } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { autonomousTradeExecution } from "@/ai/flows/autonomous-trade-execution";

const formSchema = z.object({
  isActive: z.boolean().default(false),
  strategy: z.string().min(10, {
    message: "Please provide a detailed trading strategy.",
  }),
  asset: z.string().min(2, {
    message: "Asset must be at least 2 characters.",
  }).default("BTC/USD"),
  riskPercentage: z.coerce.number().min(0.1).max(100),
  stopLossPercentage: z.coerce.number().min(0.1).max(100),
  takeProfitPercentage: z.coerce.number().min(0.1).max(100),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
});

export function AutonomousTrade() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: false,
      strategy: "Execute a mean reversion strategy on the 15-minute chart, buying on dips below the 20-period EMA and selling on rallies above.",
      asset: "BTC/USD",
      riskPercentage: 1,
      stopLossPercentage: 2,
      takeProfitPercentage: 4,
      apiKey: "",
      apiSecret: "",
    },
  });

  const isActive = form.watch("isActive");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.isActive) {
      toast({
        title: "Autonomous Mode Deactivated",
        description: "The AI trading bot is now offline.",
      });
      return;
    }
    
    if(!values.apiKey || !values.apiSecret) {
      toast({
        variant: "destructive",
        title: "API Keys Required",
        description: "Please provide API keys to execute trades.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await autonomousTradeExecution({
        ...values,
        apiKey: values.apiKey || '', // ensure string
        apiSecret: values.apiSecret || '', // ensure string
      });
      toast({
        title: "Trade Executed",
        description: `Status: ${result.tradeStatus}. P/L: ${result.profitLoss}. ${result.message}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Execution Failed",
        description: "Could not execute the trading action.",
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
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Autonomous Trade</CardTitle>
            </div>
            <CardDescription>
              Activate the AI to trade autonomously based on your strategy.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 overflow-auto p-6">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Autonomous Mode</FormLabel>
                    <FormDescription>
                      {isActive ? "AI is actively trading." : "AI is offline."}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="strategy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trading Strategy</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mean reversion on 15m chart" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="asset"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., BTC/USD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="riskPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk %</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="takeProfitPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Take Profit %</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="stopLossPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stop Loss %</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="space-y-2 pt-4">
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Exchange Credentials</p>
                <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input type="password" placeholder="API Key" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="apiSecret"
                render={({ field }) => (
                    <FormItem>
                    <FormControl>
                        <Input type="password" placeholder="API Secret" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isActive ? "Execute Trade" : "Deactivate"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
