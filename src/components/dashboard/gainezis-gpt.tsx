"use client"

import { BrainCircuit, Send } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export function GainezisGPT() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-headline">GainezisGPT</CardTitle>
        </div>
        <CardDescription>
          Your personal AI financial assistant. Ask about budgeting, debt management, investment strategies, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 overflow-auto p-6 flex flex-col">
        <div className="flex-grow space-y-4">
            <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/20">
                    <BrainCircuit className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Hello! How can I help you manage your finances today? You can ask me to create a budget or analyze your spending.</p>
                </div>
            </div>
             <div className="flex items-start gap-3 flex-row-reverse">
                <div className="p-2 rounded-full bg-foreground/10">
                    <span className="font-semibold text-sm">You</span>
                </div>
                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Create a monthly budget for me based on a $5000 income.</p>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="relative w-full">
          <Input
            placeholder="Ask GainezisGPT a question..."
            className="pr-12"
          />
          <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
