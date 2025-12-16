'use server';

/**
 * @fileOverview A flow to fetch and generate financial news content.
 *
 * - fetchFinancialNews - A function that returns a list of recent financial news articles.
 * - NewsItem - The type for a single news article.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NewsItemSchema = z.object({
  title: z.string().describe('The headline of the news article.'),
  source: z.string().describe('The source of the news (e.g., Financial Times, CoinDesk).'),
  time: z.string().describe('How long ago the news was published (e.g., 2h ago, 1d ago).'),
  category: z.enum(['Markets', 'Crypto', 'Stocks', 'Economy', 'Technology']).describe('The category of the news.'),
  imageHint: z.string().describe('A one or two-word hint for a relevant background image (e.g., "finance chart", "cryptocurrency coins").'),
  mediaType: z.enum(['image', 'video']).optional().describe('The type of media to display with the news item.'),
});

export type NewsItem = z.infer<typeof NewsItemSchema>;

const FinancialNewsOutputSchema = z.object({
  newsItems: z.array(NewsItemSchema).length(5).describe('An array of 5 recent financial news articles.'),
});

export type FinancialNewsOutput = z.infer<typeof FinancialNewsOutputSchema>;

export async function fetchFinancialNews(): Promise<FinancialNewsOutput> {
  return financialNewsFlow();
}

const prompt = ai.definePrompt({
  name: 'financialNewsPrompt',
  output: {schema: FinancialNewsOutputSchema},
  prompt: `You are a financial news service AI. Your task is to generate a list of 5 recent and relevant financial news headlines. The news should cover a range of topics including global markets, cryptocurrency, stocks, and the economy.

  For each news item, provide:
  - A compelling and realistic title.
  - A realistic source (e.g., Reuters, Bloomberg, CoinDesk, Wall Street Journal).
  - A relative timestamp (e.g., "3h ago", "1d ago").
  - A relevant category.
  - A one or two-word hint for generating a background image (e.g., "federal reserve", "stock market crash").
  - Randomly include a video report for some items where it makes sense, like a CEO interview or market analysis.

  Please also create one sponsored ad spot disguised as a news item about "Gainezis-Fintrade".

  Format the response as a JSON object containing an array of 5 news items.`,
});

const financialNewsFlow = ai.defineFlow({
  name: 'financialNewsFlow',
  outputSchema: FinancialNewsOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
