"use client"

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MarketWatch } from "@/components/dashboard/market-watch";
import { PublicFeed } from "@/components/dashboard/public-feed";
import { StrategyGenerator } from "@/components/dashboard/strategy-generator";
import { AutonomousTrade } from "@/components/dashboard/autonomous-trade";
import { FinancialNews } from "@/components/dashboard/financial-news";
import { Activity, DollarSign, Settings, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MarketPulse } from "./dashboard/market-pulse";
import { LoginPage } from "./auth/login-page";
import { SignupPage } from "./auth/signup-page";
import { BillingPage } from "./billing/billing-page";
import { LandingPage } from "./landing/landing-page";
import { LendingPage } from "./lending/lending-page";
import { GainezisGPT } from "./dashboard/gainezis-gpt";
import { WorldClock } from "./dashboard/world-clock";

export default function ClientPage({ params }: { params?: { slug: string[] } }) {
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard":
        return (
          <>
            <WorldClock />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Profit"
                value="$45,231.89"
                description="+20.1% from last month"
                icon={DollarSign}
              />
              <StatsCard
                title="Active Trades"
                value="+12"
                description="2 autonomous, 10 manual"
                icon={Activity}
              />
               <StatsCard
                title="Strategies Executed"
                value="54"
                description="+2 since last hour"
                icon={Zap}
              />
               <StatsCard
                title="Total Value Locked"
                value="$125.4M"
                description="+5.2% from last month"
                icon={DollarSign}
              />
            </div>
            
            <FinancialNews />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-1">
                  <PublicFeed />
              </div>
              <div className="lg:col-span-3 space-y-6">
                  <GainezisGPT />
                  <StrategyGenerator />
                  <AutonomousTrade />
              </div>
              <div className="lg:col-span-1">
                  <MarketWatch />
              </div>
            </div>
          </>
        );
      case "/strategy":
        return <StrategyGenerator />;
      case "/market":
        return <MarketWatch />;
      case "/autonomous":
        return <AutonomousTrade />;
      case "/feed":
        return <PublicFeed />;
      case "/pulse":
        return <MarketPulse />;
      case "/lending":
        return <LendingPage />;
      case "/login":
        return <LoginPage />;
      case "/signup":
        return <SignupPage />;
      case "/billing":
        return <BillingPage />;
      case "/settings":
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings /> Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is where the settings page will go.</p>
                </CardContent>
            </Card>
        )
      default:
        return <LandingPage />
    }
  }

  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isLandingPage = pathname === '/';

  if (isAuthPage || isLandingPage) {
    const Wrapper = isAuthPage 
      ? ({ children }: { children: React.ReactNode }) => <div className="flex items-center justify-center min-h-screen bg-background">{children}</div>
      : React.Fragment;

    return <Wrapper>{renderContent()}</Wrapper>;
  }

  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold font-headline">
              {pathname === '/dashboard' ? 'Dashboard' : pathname.charAt(1).toUpperCase() + pathname.slice(2)}
            </h1>
          </div>
          {renderContent()}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
