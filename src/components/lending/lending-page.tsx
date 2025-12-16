"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DollarSign, Landmark, TrendingUp, HandCoins } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"

const positions = [
    { id: '1', asset: 'BTC', type: 'Supply', amount: 0.5, apy: 5.1, rewards: '0.001 LPT' },
    { id: '2', asset: 'USDC', type: 'Borrow', amount: 10000, apy: 7.2, rewards: '15 LPT' },
    { id: '3', asset: 'ETH', type: 'Supply', amount: 10, apy: 4.8, rewards: '0.12 LPT' },
];

export function LendingPage() {
  return (
    <div className="space-y-6">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$125,4M</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Supplied Assets</CardTitle>
                <HandCoins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$55,231</div>
                <p className="text-xs text-muted-foreground">Earning 5.05% APY</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Borrows</CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$10,000</div>
                 <p className="text-xs text-muted-foreground">7.2% Interest Rate</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net APY</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-accent">+2.8%</div>
                <p className="text-xs text-muted-foreground">Your net earnings rate</p>
            </CardContent>
        </Card>
       </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lend Your Assets</CardTitle>
            <CardDescription>
              Earn interest and LP tokens by supplying assets to the protocol. Lenders earn 5% on supplied capital.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supply-asset">Asset</Label>
                <Input id="supply-asset" placeholder="e.g., WBTC, ETH, USDC" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supply-amount">Amount</Label>
                <Input id="supply-amount" type="number" placeholder="0.00" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Supply Asset</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Borrow Against Collateral</CardTitle>
            <CardDescription>
             Access fast cash with no credit checks. Borrowers pay a 7% interest rate and earn repayment rewards.
            </CardDescription>
          </CardHeader>
           <CardContent>
             <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="borrow-asset">Asset to Borrow</Label>
                <Input id="borrow-asset" placeholder="e.g., USDC, USDT" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="borrow-amount">Amount</Label>
                <Input id="borrow-amount" type="number" placeholder="0.00" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="secondary">Borrow Asset</Button>
          </CardFooter>
        </Card>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Your Positions</CardTitle>
                <CardDescription>
                    Manage your supplied assets and active loans.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Asset</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">APY / Interest</TableHead>
                            <TableHead className="text-right">LP Token Rewards</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {positions.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell className="font-medium">{p.asset}</TableCell>
                            <TableCell>
                                <Badge variant={p.type === 'Supply' ? 'default' : 'destructive'} className={p.type === 'Supply' ? 'bg-accent' : ''}>{p.type}</Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono">{p.amount.toLocaleString()} {p.asset}</TableCell>
                            <TableCell className={`text-right font-mono ${p.type === 'Supply' ? 'text-accent' : 'text-destructive'}`}>
                                {p.apy.toFixed(2)}%
                            </TableCell>
                            <TableCell className="text-right font-mono">{p.rewards}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Manage</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
