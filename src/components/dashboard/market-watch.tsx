import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CandlestickChart } from "lucide-react";

type Asset = {
  name: string;
  ticker: string;
  type: "Crypto" | "Forex" | "Option";
  price: number;
  change: number;
  marketCap: string;
};

const assets: Asset[] = [
    { name: "Bitcoin", ticker: "BTC/USD", type: "Crypto", price: 67123.45, change: 2.5, marketCap: "1.3T" },
    { name: "Ethereum", ticker: "ETH/USD", type: "Crypto", price: 3456.78, change: 1.8, marketCap: "415B" },
    { name: "EUR/USD", ticker: "EUR/USD", type: "Forex", price: 1.0712, change: -0.2, marketCap: "N/A" },
    { name: "Tesla Call", ticker: "TSLA 200C", type: "Option", price: 5.40, change: 15.2, marketCap: "N/A" },
    { name: "Solana", ticker: "SOL/USD", type: "Crypto", price: 145.67, change: -3.1, marketCap: "67B" },
    { name: "USD/JPY", ticker: "USD/JPY", type: "Forex", price: 157.25, change: 0.5, marketCap: "N/A" },
    { name: "NVIDIA", ticker: "NVDA", type: "Option", price: 120.89, change: 4.2, marketCap: "2.9T"},
    { name: "Gold", ticker: "XAU/USD", type: "Forex", price: 2320.50, change: 0.8, marketCap: "N/A" },
    { name: "Ripple", ticker: "XRP/USD", type: "Crypto", price: 0.485, change: 0.1, marketCap: "26B" },
    { name: "GBP/USD", ticker: "GBP/USD", type: "Forex", price: 1.2680, change: -0.1, marketCap: "N/A" },
    { name: "Apple Put", ticker: "AAPL 180P", type: "Option", price: 2.15, change: -8.5, marketCap: "N/A" },
    { name: "Cardano", ticker: "ADA/USD", type: "Crypto", price: 0.41, change: -1.5, marketCap: "14B" },
    { name: "AUD/USD", ticker: "AUD/USD", type: "Forex", price: 0.6605, change: 0.3, marketCap: "N/A" },
    { name: "Dogecoin", ticker: "DOGE/USD", type: "Crypto", price: 0.135, change: 5.5, marketCap: "19B" },
    { name: "USD/CAD", ticker: "USD/CAD", type: "Forex", price: 1.3750, change: 0.2, marketCap: "N/A" },
    { name: "Amazon Call", ticker: "AMZN 200C", type: "Option", price: 8.75, change: 12.3, marketCap: "N/A" },
    { name: "Chainlink", ticker: "LINK/USD", type: "Crypto", price: 15.25, change: 3.2, marketCap: "9B" },
    { name: "USD/CHF", ticker: "USD/CHF", type: "Forex", price: 0.9015, change: -0.3, marketCap: "N/A" },
    { name: "Litecoin", ticker: "LTC/USD", type: "Crypto", price: 78.50, change: 1.1, marketCap: "5.8B" },
    { name: "SPY Call", ticker: "SPY 500C", type: "Option", price: 12.50, change: 9.8, marketCap: "N/A" },
];


export function MarketWatch() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <CandlestickChart className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-headline">Market Watch</CardTitle>
        </div>
        <CardDescription>
          Real-time data for 20 monitored assets.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>24h Change</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.ticker}>
                  <TableCell>
                    <div className="font-medium">{asset.name}</div>
                    <div className="text-sm text-muted-foreground">{asset.ticker}</div>
                  </TableCell>
                  <TableCell>${asset.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={asset.change >= 0 ? "default" : "destructive"}
                      className={asset.change >= 0 ? "bg-accent text-accent-foreground" : ""}
                    >
                      {asset.change > 0 ? "+" : ""}
                      {asset.change.toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Trade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
