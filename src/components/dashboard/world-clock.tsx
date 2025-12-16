"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

type Market = {
  name: string;
  acronym: string;
  timezone: string;
  open: string; // Local time, e.g., "09:30"
  close: string; // Local time, e.g., "16:00"
  days: number[]; // 0 = Sunday, 6 = Saturday
};

const markets: Market[] = [
  { name: 'New York', acronym: 'NYSE', timezone: 'America/New_York', open: '09:30', close: '16:00', days: [1, 2, 3, 4, 5] },
  { name: 'London', acronym: 'LSE', timezone: 'Europe/London', open: '08:00', close: '16:30', days: [1, 2, 3, 4, 5] },
  { name: 'Tokyo', acronym: 'TSE', timezone: 'Asia/Tokyo', open: '09:00', close: '15:00', days: [1, 2, 3, 4, 5] },
  { name: 'Paris', acronym: 'CAC 40', timezone: 'Europe/Paris', open: '09:00', close: '17:30', days: [1, 2, 3, 4, 5] },
  { name: 'Hong Kong', acronym: 'HKEX', timezone: 'Asia/Hong_Kong', open: '09:30', close: '16:00', days: [1, 2, 3, 4, 5] },
];

const useMarketStatus = (market: Market) => {
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat([], {
        timeZone: market.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      const localTimeParts = formatter.formatToParts(now);
      const localTime = new Date(now.toLocaleString('en-US', { timeZone: market.timezone }));

      const getPart = (part: Intl.DateTimeFormatPartTypes) => localTimeParts.find(p => p.type === part)?.value || '00';
      const currentHour = parseInt(getPart('hour'), 10);
      const currentMinute = parseInt(getPart('minute'), 10);
      const currentDay = localTime.getDay();
      
      setTime(`${getPart('hour')}:${getPart('minute')}`);

      const [openHour, openMinute] = market.open.split(':').map(Number);
      const [closeHour, closeMinute] = market.close.split(':').map(Number);

      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      const openTimeInMinutes = openHour * 60 + openMinute;
      const closeTimeInMinutes = closeHour * 60 + closeMinute;

      const marketIsOpen =
        market.days.includes(currentDay) &&
        currentTimeInMinutes >= openTimeInMinutes &&
        currentTimeInMinutes < closeTimeInMinutes;

      setIsOpen(marketIsOpen);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [market]);

  return { time, isOpen };
};


const MarketClock = ({ market }: { market: Market }) => {
  const { time, isOpen } = useMarketStatus(market);

  return (
    <div className="flex items-center justify-between">
      <div className="text-left">
        <p className="font-semibold">{market.name}</p>
        <p className="text-xs text-muted-foreground">{market.acronym}</p>
      </div>
      <div className="text-right">
         <p className="font-mono text-lg">{time}</p>
         <div className="flex items-center justify-end gap-2">
             <span className={cn("h-2 w-2 rounded-full", isOpen ? "bg-green-500 animate-pulse" : "bg-red-500")}></span>
            <p className="text-xs font-semibold">{isOpen ? "Open" : "Closed"}</p>
         </div>
      </div>
    </div>
  );
};


export const WorldClock = () => {
    return (
        <Card>
            <CardContent className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {markets.map(market => (
                    <MarketClock key={market.acronym} market={market} />
                ))}
            </CardContent>
        </Card>
    )
}
