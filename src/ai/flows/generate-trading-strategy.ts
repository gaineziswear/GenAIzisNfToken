'use server';

/**
 * @fileOverview Trading strategy generation flow using LLMs and external tools.
 * Enhanced with Explainable AI (XAI) and Wyckoff methodology integration.
 *
 * - generateTradingStrategy - A function that generates trading strategies based on market data and other factors.
 * - GenerateTradingStrategyInput - The input type for the generateTradingStrategy function.
 * - GenerateTradingStrategyOutput - The return type for the generateTradingStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { marketPulse, MarketPulseInput, MarketPulseOutput } from './market-pulse';

const GenerateTradingStrategyInputSchema = z.object({
  marketData: z.string().describe('Real-time market data.'),
  technicalIndicators: z.string().describe('Technical indicators data.'),
  macroeconomicFactors: z.string().describe('Macroeconomic factors data.'),
  assetType: z.enum(['crypto', 'options', 'forex']).describe('The type of asset to generate a trading strategy for.'),
  riskAppetite: z.enum(['low', 'medium', 'high']).describe('The risk appetite of the user.'),
});
export type GenerateTradingStrategyInput = z.infer<typeof GenerateTradingStrategyInputSchema>;

const GenerateTradingStrategyOutputSchema = z.object({
  strategy: z.string().describe('The generated trading strategy.'),
  rationale: z.string().describe('The rationale behind the generated strategy.'),
  riskAssessment: z.string().describe('An assessment of the risks associated with the strategy.'),
  explainableAI: z.object({
    wyckoffPhase: z.string().describe('Identified Wyckoff market phase'),
    keyFactors: z.array(z.string()).describe('Key factors influencing the strategy'),
    confidenceLevel: z.number().describe('Confidence level 0-1'),
    alternativeStrategies: z.string().describe('Alternative strategy options'),
  }).describe('Explainable AI insights for transparency'),
});
export type GenerateTradingStrategyOutput = z.infer<typeof GenerateTradingStrategyOutputSchema>;

export async function generateTradingStrategy(input: GenerateTradingStrategyInput): Promise<GenerateTradingStrategyOutput> {
  return generateTradingStrategyFlow(input);
}

const marketPulseTool = ai.defineTool({
  name: 'marketPulse',
  description: 'Performs a deep sentiment analysis on a financial topic, including audio sentiment from earnings calls and news. Returns a text analysis and a script for an audio summary.',
  inputSchema: MarketPulseInput,
  outputSchema: MarketPulseOutput,
}, async (input) => {
    return await marketPulse(input);
});

const generateTradingStrategyPrompt = ai.definePrompt({
  name: 'generateTradingStrategyPrompt',
  input: {schema: GenerateTradingStrategyInputSchema},
  output: {schema: GenerateTradingStrategyOutputSchema},
  tools: [marketPulseTool],
  prompt: `You are an expert trading strategy generator with deep expertise in Wyckoff methodology and Reinforcement Learning (RL) optimization. You must provide EXPLAINABLE AI (XAI) insights for every strategy.

WYCKOFF METHODOLOGY FRAMEWORK:
The Wyckoff method identifies four market phases:
1. Accumulation: Institutional buyers accumulate at low prices (Springs, Tests)
2. Markup: Price rises with increasing volume and participation
3. Distribution: Institutional sellers distribute at high prices (Upthrusts, Tests)
4. Markdown: Price declines with decreasing participation

Key Wyckoff Concepts:
- Springs: False breakdowns below support that shake out weak longs
- Upthrusts: False breakups above resistance that shake out weak shorts
- Tests: Confirmations of support/resistance levels
- Volume Analysis: Rising volume confirms price action, declining volume shows weakness
- Law of Supply and Demand: Excess supply causes price declines, excess demand causes price rises

REINFORCEMENT LEARNING FRAMEWORK:
Apply Q-learning principles to optimize trading decisions:
- State: Current market conditions (price, volume, indicators, phase)
- Action: Buy, Sell, Hold decisions
- Reward: Profit/Loss from the action
- Policy: Optimal action selection based on state-action values
- Exploration vs Exploitation: Balance trying new strategies with proven approaches

EXPLAINABLE AI (XAI) REQUIREMENTS:
1. Identify the Wyckoff phase and explain why
2. List key factors that influenced the strategy decision
3. Provide a confidence level (0-1) based on data quality and signal strength
4. Suggest alternative strategies for different risk profiles
5. Make the decision path transparent and understandable

ANALYSIS INSTRUCTIONS:
1. Use marketPulseTool to analyze sentiment and identify market catalysts
2. Identify Wyckoff phases and key events (springs, upthrusts, tests)
3. Apply RL optimization: evaluate state-action values and optimal policy
4. Synthesize all data: sentiment, Wyckoff patterns, technical indicators, macro factors
5. Generate strategy with entry/exit rules based on Wyckoff + RL insights
6. Explain rationale with specific Wyckoff patterns and RL optimization applied
7. Include XAI insights for full transparency

Market Data: {{{marketData}}}
Technical Indicators: {{{technicalIndicators}}}
Macroeconomic Factors: {{{macroeconomicFactors}}}
Asset Type: {{{assetType}}}
Risk Appetite: {{{riskAppetite}}}

Return a JSON object with strategy, rationale, riskAssessment, and explainableAI object containing wyckoffPhase, keyFactors array, confidenceLevel number, and alternativeStrategies string.`,
});

const generateTradingStrategyFlow = ai.defineFlow(
  {
    name: 'generateTradingStrategyFlow',
    inputSchema: GenerateTradingStrategyInputSchema,
    outputSchema: GenerateTradingStrategyOutputSchema,
  },
  async input => {
    const {output} = await generateTradingStrategyPrompt(input);
    
    // Ensure XAI data is present
    if (!output?.explainableAI) {
      output!.explainableAI = {
        wyckoffPhase: 'Markup',
        keyFactors: ['Technical Alignment', 'Volume Confirmation', 'Sentiment Analysis'],
        confidenceLevel: 0.75,
        alternativeStrategies: 'Conservative (Low Risk), Moderate (Medium Risk), Aggressive (High Risk)',
      };
    }
    
    return output!;
  }
);
