"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Flame,
  Loader2,
  Newspaper,
  Rocket,
} from "lucide-react";
import type { TradingOpportunity } from "@/ai/flows/public-channel-content";
import { generateTradingOpportunities } from "@/ai/flows/public-channel-content";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

export function PublicFeed() {
  const [opportunities, setOpportunities] = React.useState<TradingOpportunity[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  const fetchOpportunities = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await generateTradingOpportunities();
      setOpportunities(result.opportunities);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch opportunities",
        description: "Please try again later.",
      });
      setOpportunities([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const OpportunityCard = ({ opp }: { opp: TradingOpportunity }) => {
    const isBuy = opp.action === "buy";
    const isHighGain = opp.potentialGain === "High";

    return (
      <div className="p-4 bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{opp.asset}</h4>
              <Badge variant={isBuy ? "default" : "destructive"} className={isBuy ? "bg-accent text-accent-foreground" : ""}>
                {isBuy ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownLeft className="w-3 h-3 mr-1" />}
                {opp.action}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{opp.rationale}</p>
          </div>
          {isHighGain && <Flame className="w-5 h-5 text-amber-500" />}
        </div>
        <Separator className="my-3" />
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div>
                <p className="text-muted-foreground">Entry</p>
                <p className="font-mono">${opp.entryPoint.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-muted-foreground">Stop Loss</p>
                <p className="font-mono">${opp.stopLoss.toFixed(2)}</p>
            </div>
            <div>
                <p className="text-muted-foreground">Take Profit</p>
                <p className="font-mono">${opp.takeProfit.toFixed(2)}</p>
            </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <Newspaper className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-headline">Public Channel Feed</CardTitle>
        </div>
        <CardDescription>
          Hourly trading opportunities for our public channel.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {isLoading && !opportunities.length ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          opportunities.map((opp, index) => <OpportunityCard key={index} opp={opp} />)
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={fetchOpportunities} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Rocket className="mr-2 h-4 w-4" />
          )}
          Get New Opportunities
        </Button>
      </CardFooter>
    </Card>
  );
}
