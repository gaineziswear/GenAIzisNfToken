'use server';

/**
 * @fileOverview A flow to generate trading opportunities for a public Telegram channel.
 *
 * - generateTradingOpportunities - A function that generates three trading opportunities, including one high-gain opportunity.
 * - TradingOpportunity - The type for a single trading opportunity.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TradingOpportunitySchema = z.object({
  asset: z.string().describe('The asset to trade (e.g., BTC, AAPL).'),
  action: z.enum(['buy', 'sell']).describe('The recommended action (buy or sell).'),
  entryPoint: z.number().describe('The entry point for the trade.'),
  stopLoss: z.number().describe('The stop loss level.'),
  takeProfit: z.number().describe('The take profit level.'),
  confidence: z.string().describe('Confidence level (Low, Medium, High).'),
  potentialGain: z.string().describe('Gain potential (Low, Medium, High).'),
  rationale: z.string().describe('Rationale behind the trading opportunity.'),
});

export type TradingOpportunity = z.infer<typeof TradingOpportunitySchema>;

const PublicChannelContentOutputSchema = z.object({
  opportunities: z.array(TradingOpportunitySchema).length(3).describe('Three trading opportunities, including one high-gain opportunity.'),
});

export type PublicChannelContentOutput = z.infer<typeof PublicChannelContentOutputSchema>;

export async function generateTradingOpportunities(): Promise<PublicChannelContentOutput> {
  return publicChannelContentFlow();
}

const prompt = ai.definePrompt({
  name: 'publicChannelContentPrompt',
  output: {schema: PublicChannelContentOutputSchema},
  prompt: `You are an expert financial analyst providing trading opportunities for a public Telegram channel.

  Generate three trading opportunities, including one high-gain opportunity. Provide the asset, recommended action (buy or sell), entry point, stop loss, take profit, and rationale for each opportunity. Ensure one opportunity has High potentialGain and provide a rationale that explains the high gain potential clearly.

  Format the response as a JSON object with an array of three trading opportunities.
  `,
});

const publicChannelContentFlow = ai.defineFlow({
  name: 'publicChannelContentFlow',
  outputSchema: PublicChannelContentOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
