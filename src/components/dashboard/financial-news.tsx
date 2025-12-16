"use client"

import * as React from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Film, Loader2, Rss } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useToast } from "@/hooks/use-toast"
import type { NewsItem } from "@/ai/flows/fetch-financial-news"
import { fetchFinancialNews } from "@/ai/flows/fetch-financial-news"
import { Skeleton } from "../ui/skeleton"


export function FinancialNews() {
  const [newsItems, setNewsItems] = React.useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  const getNews = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchFinancialNews();
      const newsWithAd = result.newsItems.map(item => 
        item.source.toLowerCase() === 'gainezis-fintrade' 
        ? {...item, category: 'Advertisement'} 
        : {...item, mediaType: Math.random() > 0.7 ? 'video' : 'image'} // Randomly assign media type
      );
      setNewsItems(newsWithAd);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch news",
        description: "Could not load financial news at this time.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    getNews();
  }, [getNews]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <Rss className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-headline">Financial News</CardTitle>
        </div>
        <CardDescription>
          The latest headlines and video reports impacting the markets.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0 flex items-center justify-center">
        {isLoading ? (
            <div className="flex w-full px-4">
                <Carousel
                    opts={{ align: "start" }}
                    className="w-full"
                >
                    <CarouselContent>
                        {Array.from({ length: 3 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
                            <div className="p-1">
                                <Card className="overflow-hidden">
                                    <Skeleton className="h-[171px] w-full" />
                                    <CardHeader className="p-4">
                                        <Skeleton className="w-1/4 h-5 mb-2" />
                                        <Skeleton className="w-full h-8" />
                                    </CardHeader>
                                    <CardFooter className="p-4 flex justify-between items-center">
                                        <Skeleton className="w-1/3 h-4" />
                                        <Skeleton className="w-1/4 h-4" />
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {newsItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden h-full flex flex-col">
                       <div className="relative aspect-video w-full">
                        {item.mediaType === 'video' ? (
                          <div className="w-full h-full bg-black flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/50 z-10"></div>
                            <Film className="w-12 h-12 text-white/50 z-20" />
                            <Image
                                src={`https://placehold.co/600x400.png`}
                                alt={item.title}
                                layout="fill"
                                className="object-cover blur-sm"
                                data-ai-hint={item.imageHint}
                            />
                          </div>
                        ) : (
                          <Image
                            src={`https://placehold.co/600x400.png`}
                            alt={item.title}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                            data-ai-hint={item.imageHint}
                          />
                        )}
                      </div>
                      <CardHeader className="p-4 flex-grow">
                        <Badge className="w-fit mb-2" variant={item.category === 'Advertisement' ? 'destructive' : 'secondary'}>{item.category}</Badge>
                        <CardTitle className="text-base font-semibold leading-tight">{item.title}</CardTitle>
                      </CardHeader>
                      <CardFooter className="p-4 flex justify-between items-center text-xs text-muted-foreground mt-auto">
                        <span>{item.source}</span>
                        <span>{item.time}</span>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        )}
      </CardContent>
    </Card>
  )
}
