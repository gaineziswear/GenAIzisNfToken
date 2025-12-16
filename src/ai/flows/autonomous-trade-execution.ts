'use server';

/**
 * @fileOverview An AI agent to autonomously execute trades based on generated strategies.
 *
 * - autonomousTradeExecution - A function to enable autonomous trading mode.
 * - AutonomousTradeExecutionInput - The input type for the autonomousTradeExecution function.
 * - AutonomousTradeExecutionOutput - The return type for the autonomousTradeExecution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutonomousTradeExecutionInputSchema = z.object({
  strategy: z.string().describe('The trading strategy to execute.'),
  asset: z.string().describe('The asset to trade (e.g., BTC, ETH, EUR/USD).'),
  riskPercentage: z.number().describe('The percentage of capital to risk per trade.'),
  stopLossPercentage: z.number().describe('The stop loss percentage.'),
  takeProfitPercentage: z.number().describe('The take profit percentage.'),
  apiKey: z.string().describe('API key for accessing trading platform.'),
  apiSecret: z.string().describe('API secret for accessing trading platform.'),
  isActive: z.boolean().optional().describe('Whether autonomous mode is active.'),
});
export type AutonomousTradeExecutionInput = z.infer<
  typeof AutonomousTradeExecutionInputSchema
>;

const AutonomousTradeExecutionOutputSchema = z.object({
  tradeStatus: z.string().describe('The status of the trade (e.g., OPEN, CLOSED, STOPPED).'),
  profitLoss: z.number().describe('The profit or loss of the trade.'),
  message: z.string().describe('A message describing the trade execution.'),
});
export type AutonomousTradeExecutionOutput = z.infer<
  typeof AutonomousTradeExecutionOutputSchema
>;

export async function autonomousTradeExecution(
  input: AutonomousTradeExecutionInput
): Promise<AutonomousTradeExecutionOutput> {
  return autonomousTradeExecutionFlow(input);
}

const autonomousTradeExecutionPrompt = ai.definePrompt({
  name: 'autonomousTradeExecutionPrompt',
  input: {schema: AutonomousTradeExecutionInputSchema},
  output: {schema: AutonomousTradeExecutionOutputSchema},
  prompt: `You are an autonomous trading agent executing trades based on provided strategies with Reinforcement Learning (RL) optimization.

REINFORCEMENT LEARNING EXECUTION FRAMEWORK:
Apply Q-learning principles to optimize trade execution:
1. State Evaluation: Assess current market state (price, volume, indicators)
2. Action Selection: Determine optimal action (Buy, Sell, Hold) based on learned Q-values
3. Risk Management: Apply position sizing based on risk appetite and RL policy
4. Reward Optimization: Maximize expected future rewards (profit) while minimizing risk
5. Policy Learning: Continuously improve trading decisions based on historical performance
6. Exploration-Exploitation: Balance trying new strategies with proven approaches

TRADE EXECUTION PARAMETERS:
Asset: {{{asset}}}
Strategy: {{{strategy}}}

Risk Management:
- Risk percentage per trade: {{{riskPercentage}}}%
- Stop loss threshold: {{{stopLossPercentage}}}%
- Take profit target: {{{takeProfitPercentage}}}%

RL OPTIMIZATION RULES:
1. Position Sizing: Calculate position size using Kelly Criterion with RL-optimized win rate
2. Entry Signals: Confirm entry based on strategy + RL confidence score
3. Exit Rules: Execute exits based on stop loss, take profit, or RL-detected regime change
4. Adaptive Learning: Adjust parameters based on recent trade performance
5. Risk Limits: Enforce maximum drawdown and daily loss limits

EXECUTION INSTRUCTIONS:
1. Validate the strategy aligns with current market conditions
2. Calculate optimal position size using RL-optimized parameters
3. Execute the trade with proper risk management
4. Monitor the trade in real-time
5. Apply RL-based exit signals (stop loss, take profit, or policy-based exit)
6. Log the trade result for RL model improvement

Use the provided API key and secret to interact with the trading platform securely.
Respond with the trade status, profit/loss, and a descriptive message including RL metrics.`,
});

const autonomousTradeExecutionFlow = ai.defineFlow(
  {
    name: 'autonomousTradeExecutionFlow',
    inputSchema: AutonomousTradeExecutionInputSchema,
    outputSchema: AutonomousTradeExecutionOutputSchema,
  },
  async input => {
    // In a real implementation, this is where the trading logic would go,
    // including connecting to a trading platform with the API key and secret,
    // executing the trade with RL optimization, and monitoring the trade status.
    // This example flow simply simulates the trade execution with RL concepts.

    const {output} = await autonomousTradeExecutionPrompt(input);
    return output!;
  }
);
