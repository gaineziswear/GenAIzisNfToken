"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, BrainCircuit, LineChart, Newspaper, Sparkles, TrendingUp, BarChart3, ArrowRight, Shield, Zap } from "lucide-react"
import Link from "next/link"

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <Card className="border-border hover:border-primary/60 transition-all duration-200">
        <CardHeader>
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded">
                    <div className="text-primary text-lg">{icon}</div>
                </div>
                <CardTitle className="text-base font-semibold">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
    </Card>
)

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container px-4 lg:px-6 h-16 flex items-center justify-between">
                    <Link href="#" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary rounded">
                            <LineChart className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold text-foreground">Gainezis-Fintrade</span>
                    </Link>
                    <nav className="flex gap-6 items-center">
                        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Login
                        </Link>
                        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold">
                            <Link href="/signup">Get Started</Link>
                        </Button>
                    </nav>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="border-b border-border py-20 md:py-32 lg:py-40">
                    <div className="container px-4 lg:px-6">
                        <div className="max-w-3xl mx-auto text-center space-y-8">
                            <div className="space-y-4">
                                <div className="inline-block">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider px-3 py-1 bg-primary/10 rounded">
                                        Powered by Quantum AI
                                    </span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                                    The Future of <span className="text-primary">Algorithmic Trading</span>
                                </h1>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Leverage institutional-grade AI to generate, test, and deploy autonomous trading strategies across any asset class. Experience professional-grade market analysis with unprecedented precision.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                                    <Link href="/dashboard" className="flex items-center gap-2">
                                        Launch App
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-border hover:border-primary/60 font-semibold">
                                    <Link href="#features">Learn More</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="border-b border-border py-20 md:py-32">
                    <div className="container px-4 lg:px-6">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">Advanced Features</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                                Unlock Alpha with Predictive AI
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Our platform provides a comprehensive suite of professional-grade tools designed to give you a competitive edge in the market.
                            </p>
                        </div>

                        <div className="grid max-w-5xl mx-auto gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <FeatureCard
                                icon={<Sparkles className="w-5 h-5" />}
                                title="Strategy AI"
                                description="Generate novel trading strategies using Large Language Models that process market data, technical indicators, and macroeconomic factors with Wyckoff methodology integration."
                            />
                            <FeatureCard
                                icon={<Bot className="w-5 h-5" />}
                                title="Autonomous Trade"
                                description="Activate autonomous mode for the AI to execute trades 24/7 based on your predefined risk parameters and generated strategies with RL optimization."
                            />
                            <FeatureCard
                                icon={<BrainCircuit className="w-5 h-5" />}
                                title="Market Pulse"
                                description="Utilize forensic analysis of human sentiment from audio sources. Our AI detects subtle, non-verbal cues in executive speech to predict market-moving sentiment shifts."
                            />
                            <FeatureCard
                                icon={<TrendingUp className="w-5 h-5" />}
                                title="Asset Monitoring"
                                description="Monitor real-time market data across a curated list of 20 high-potential assets, ranked from least to most profitable with live price updates."
                            />
                            <FeatureCard
                                icon={<Newspaper className="w-5 h-5" />}
                                title="Channel Integration"
                                description="Attach our bot to your Telegram channel to receive high-probability trading opportunities and financial news, incentivizing community engagement."
                            />
                            <FeatureCard
                                icon={<Shield className="w-5 h-5" />}
                                title="Risk Management"
                                description="Seamlessly connect to leading trading platforms like MetaTrader using your API keys for secure, direct trade execution with real-time synchronization."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="border-b border-border py-20 md:py-32">
                    <div className="container px-4 lg:px-6">
                        <div className="max-w-3xl mx-auto text-center space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-bold">
                                    Ready to Revolutionize Your Trading?
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Join thousands of traders who are leveraging AI to gain an unfair advantage. Sign up now and start your journey towards automated profitability.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                                    <Link href="/signup">Start Free Trial</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="border-border hover:border-primary/60 font-semibold">
                                    <Link href="/login">Sign In</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-border py-8 px-4 md:px-6 bg-background/50">
                <div className="container flex flex-col gap-6 sm:flex-row items-center justify-between">
                    <p className="text-sm text-muted-foreground">&copy; 2024 Gainezis-Fintrade. All rights reserved.</p>
                    <nav className="flex gap-6">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
