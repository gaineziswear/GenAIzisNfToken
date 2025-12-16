import { config } from 'dotenv';
config();

import '@/ai/flows/autonomous-trade-execution.ts';
import '@/ai/flows/generate-trading-strategy.ts';
import '@/ai/flows/public-channel-content.ts';
import '@/ai/flows/fetch-financial-news.ts';
import '@/ai/flows/market-pulse.ts';
import '@/ai/flows/text-to-speech.ts';
import '@/services/telegram-bot.ts';
