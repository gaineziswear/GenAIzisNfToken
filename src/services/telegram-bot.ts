/**
 * @fileoverview Initializes and configures the Telegram bot for Gainezis-Fintrade.
 * This bot provides access to AI-powered trading tools directly within Telegram.
 */

import TelegramBot from 'node-telegram-bot-api';
import { marketPulse } from '@/ai/flows/market-pulse';
import { fetchFinancialNews } from '@/ai/flows/fetch-financial-news';
import { generateTradingStrategy } from '@/ai/flows/generate-trading-strategy';
import type { GenerateTradingStrategyInput } from '@/ai/flows/generate-trading-strategy';

/**
 * Starts the Telegram bot and sets up its command handlers.
 */
export function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.warn('TELEGRAM_BOT_TOKEN is not set. The Telegram bot will not be started.');
    return;
  }

  const bot = new TelegramBot(token, { polling: true });

  console.log('Gainezisfintechbot started...');

  // Handler for the /start command
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      "Welcome to Gainezis-Fintrade Bot! I'm here to help you with AI-powered market insights. Try /help to see what I can do."
    );
  });

  // Handler for the /help command
  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      `Here are the available commands:
/pulse <topic> - Get a deep sentiment analysis on a financial topic (e.g., /pulse NVIDIA stock).
/news - Fetches the latest 5 financial news headlines.
/strategyhelp - Shows how to use the strategy generation command.
/strategy <asset>;<risk>;<market_data> - Generate a trading strategy.
/help - Show this help message.
`
    );
  });

  // Handler for the /pulse command
  bot.onText(/\/pulse (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const topic = match?.[1];

    if (!topic) {
      bot.sendMessage(chatId, "Please provide a topic for the market pulse analysis. Usage: /pulse <topic>");
      return;
    }

    try {
      await bot.sendMessage(chatId, `🧠 Analyzing market pulse for "${topic}"... This may take a moment.`);
      
      const pulseResult = await marketPulse({ topic });
      
      const response = `
*Market Pulse Report: ${topic}*

*Analysis:*
${pulseResult.analysis}
      `;
      
      bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });

    } catch (error) {
      console.error('Error fetching market pulse:', error);
      bot.sendMessage(chatId, "Sorry, I couldn't complete the analysis. Please try again later.");
    }
  });

  // Handler for the /news command
  bot.onText(/\/news/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendMessage(chatId, "📰 Fetching the latest financial news...");
      const newsResult = await fetchFinancialNews();
      let response = "*Latest Financial News:*\n\n";
      newsResult.newsItems.forEach(item => {
        response += `*${item.title}* (${item.source}) - _${item.time}_\n\n`;
      });
      bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
    } catch (error) {
      console.error('Error fetching financial news:', error);
      bot.sendMessage(chatId, "Sorry, I couldn't fetch the news. Please try again later.");
    }
  });

  // Handler for the /strategyhelp command
  bot.onText(/\/strategyhelp/, (msg) => {
    const helpText = `
*How to use the /strategy command:*

The command requires 3 parameters separated by a semicolon ';'.

*/strategy <assetType>;<riskAppetite>;<marketData>*

*Parameters:*
1.  *assetType*: Must be one of \`crypto\`, \`options\`, or \`forex\`.
2.  *riskAppetite*: Must be one of \`low\`, \`medium\`, or \`high\`.
3.  *marketData*: A short text describing the current market situation.

*Example:*
\`/strategy crypto;high;BTC is showing high volatility and breaking resistance.\`
    `;
    bot.sendMessage(msg.chat.id, helpText, { parse_mode: 'Markdown' });
  });

  // Handler for the /strategy command
  bot.onText(/\/strategy (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const fullArgs = match?.[1];

    if (!fullArgs) {
        bot.sendMessage(chatId, "Please provide arguments for the strategy. Use /strategyhelp for more info.");
        return;
    }

    const args = fullArgs.split(';').map(arg => arg.trim());
    const [assetType, riskAppetite, marketData] = args;

    if (!assetType || !riskAppetite || !marketData) {
        bot.sendMessage(chatId, "Invalid format. Please provide all 3 arguments separated by semicolons. Use /strategyhelp for more info.");
        return;
    }
    
    const validAssetTypes = ['crypto', 'options', 'forex'];
    const validRiskAppetites = ['low', 'medium', 'high'];

    if (!validAssetTypes.includes(assetType) || !validRiskAppetites.includes(riskAppetite)) {
        bot.sendMessage(chatId, "Invalid asset type or risk appetite. Use /strategyhelp for allowed values.");
        return;
    }

    try {
        await bot.sendMessage(chatId, `🤖 Generating a *${riskAppetite}* risk strategy for *${assetType}*...`);

        const input: GenerateTradingStrategyInput = {
            assetType: assetType as 'crypto' | 'options' | 'forex',
            riskAppetite: riskAppetite as 'low' | 'medium' | 'high',
            marketData: marketData,
            technicalIndicators: "User is on Telegram, provide general indicators.", // Placeholder
            macroeconomicFactors: "User is on Telegram, provide general factors." // Placeholder
        };

        const result = await generateTradingStrategy(input);

        const response = `
*Generated Trading Strategy:*

*Strategy:*
${result.strategy}

*Rationale:*
${result.rationale}

*Risk Assessment:*
${result.riskAssessment}
        `;

        bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error('Error generating trading strategy:', error);
        bot.sendMessage(chatId, "Sorry, I couldn't generate a strategy at this time.");
    }
  });


   // Listen for any kind of message that is not a command
  bot.on('message', (msg) => {
    // Avoid reacting to commands
    if (msg.text && msg.text.startsWith('/')) {
      return;
    }
    console.log(`Received message from ${msg.chat.id}: ${msg.text}`);
  });

  return bot;
}

// Initialize the bot when this module is loaded
startTelegramBot();
