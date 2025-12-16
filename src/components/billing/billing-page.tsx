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
import { Check, Copy, CreditCard, QrCode, Wallet } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import Image from "next/image"

export function BillingPage() {
  return (
    <div className="grid gap-6 md:grid-cols-5">
      <div className="md:col-span-3 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>
              You are currently on the Free plan. Upgrade to unlock more features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="free" className="grid gap-4 md:grid-cols-2">
              <div>
                <RadioGroupItem value="pro" id="pro" className="peer sr-only" />
                <Label
                  htmlFor="pro"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <div className="flex items-center justify-center w-full mb-4">
                        <span className="font-semibold text-lg">Pro Plan</span>
                        <span className="ml-auto font-bold text-2xl">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></span>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground w-full">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Unlimited Strategy Generations</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Autonomous Trading</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Market Pulse Analysis</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Priority Support</li>
                    </ul>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="enterprise" id="enterprise" className="peer sr-only" />
                <Label
                  htmlFor="enterprise"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                    <div className="flex items-center justify-center w-full mb-4">
                        <span className="font-semibold text-lg">Enterprise</span>
                        <span className="ml-auto font-bold text-2xl">Custom</span>
                    </div>
                     <ul className="space-y-2 text-sm text-muted-foreground w-full">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Dedicated Infrastructure</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Custom Model Training</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> 24/7 Enterprise Support</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary"/> Volume Discounts</li>
                    </ul>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
         <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                Add a payment method to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="card">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="card"><CreditCard className="w-4 h-4 mr-2"/> Credit Card</TabsTrigger>
                        <TabsTrigger value="crypto"><Wallet className="w-4 h-4 mr-2"/> Crypto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="pt-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-name">Name on Card</Label>
                                <Input id="card-name" placeholder="MAX ROBINSON" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="**** **** **** 1234" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="crypto" className="pt-4">
                       <div className="space-y-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Send BTC to the following address. Your plan will be activated upon confirmation.
                            </p>
                            <div className="flex items-center justify-center">
                                <Image 
                                    src="https://placehold.co/160x160.png" 
                                    width={160} 
                                    height={160} 
                                    alt="QR Code"
                                    data-ai-hint="qr code" 
                                />
                            </div>
                            <div className="flex items-center gap-2 rounded-md border bg-background p-2">
                                <span className="text-sm font-mono truncate">bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq</span>
                                <Button variant="ghost" size="icon" className="w-8 h-8">
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                       </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Confirm Payment</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}
