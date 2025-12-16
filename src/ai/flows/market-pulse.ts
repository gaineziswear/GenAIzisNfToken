'use server';

/**
 * @fileOverview An AI agent to analyze market sentiment from various sources, including audio.
 *
 * - marketPulse - A function to generate a market sentiment analysis.
 * - MarketPulseInput - The input type for the marketPulse function.
 * - MarketPulseOutput - The return type for the marketPulse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MarketPulseInputSchema = z.object({
  topic: z.string().describe('The financial topic to analyze (e.g., a stock, crypto asset, or market sector).'),
});
export type MarketPulseInput = z.infer<typeof MarketPulseInputSchema>;

const MarketPulseOutputSchema = z.object({
  analysis: z.string().describe('A detailed text-based analysis of the market sentiment for the given topic, citing various sources.'),
  audioScript: z.string().describe('A script for a spoken audio summary of the analysis. The script should use different speaker labels (e.g., Speaker1, Speaker2) to create a more engaging, news-report-style summary. Speaker1 should be the main narrator.'),
});
export type MarketPulseOutput = z.infer<typeof MarketPulseOutputSchema>;

export async function marketPulse(input: MarketPulseInput): Promise<MarketPulseOutput> {
  return marketPulseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketPulsePrompt',
  input: {schema: MarketPulseInputSchema},
  output: {schema: MarketPulseOutputSchema},
  prompt: `You are a sophisticated financial analyst AI called "Market Pulse". Your unique capability is to synthesize information not just from text but also from the sentiment conveyed in audio, such as earnings calls and financial news broadcasts.

  For the given topic, "{{{topic}}}", perform a deep analysis of the current market sentiment. Your analysis should:
  1.  Incorporate data from news articles, social media (like Reddit and Twitter), and financial reports.
  2.  **Simulate** an analysis of audio sentiment. For example, mention the "tone of voice on the latest earnings call" or "hesitation detected in the CEO's recent interview". You must invent these audio-based details to make your analysis unique.
  3.  Provide a concise yet comprehensive text 'analysis'.
  4.  Create an 'audioScript' for a multi-speaker audio report. Use "Speaker1" for the main narrator and "Speaker2" for quoting simulated sources or adding color commentary. The script should be engaging and sound like a professional news segment.

  Your response must be structured as a JSON object with 'analysis' and 'audioScript' fields.`,
});

const marketPulseFlow = ai.defineFlow(
  {
    name: 'marketPulseFlow',
    inputSchema: MarketPulseInputSchema,
    outputSchema: MarketPulseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
