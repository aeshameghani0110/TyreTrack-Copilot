
import React, { useState, useRef, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ChatInterface from "@/components/chat/ChatInterface";
import QuickActions from "@/components/dashboard/QuickActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  
  const handleQuickAction = (question: string) => {
    setSelectedQuestion(question);
    // Scroll to chat interface
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Pass the selected question to ChatInterface
  useEffect(() => {
    // Create a custom event for the chat interface
    if (selectedQuestion) {
      const event = new CustomEvent("quickActionSelected", {
        detail: { question: selectedQuestion }
      });
      document.dispatchEvent(event);
    }
  }, [selectedQuestion]);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/30">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 container px-3 sm:px-4 py-4 sm:py-6 mx-auto w-full max-w-full">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">TyreAI Assistant</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your intelligent companion for tire manufacturing knowledge and support
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              <section>
                <Card className="bg-primary text-white mb-4 sm:mb-6">
                  <CardHeader className="pb-1 sm:pb-2">
                    <CardTitle className="text-lg sm:text-xl">Welcome to TyreAI</CardTitle>
                    <CardDescription className="text-white/80 text-sm sm:text-base">
                      Ask me anything about tire manufacturing processes, materials, quality control, or industry standards
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs sm:text-sm">
                      As your tire manufacturing assistant, I'm here to provide expert knowledge and support for all your manufacturing needs.
                    </div>
                  </CardContent>
                </Card>
                
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Actions</h2>
                <QuickActions onSelectAction={handleQuickAction} />
              </section>
              
              <section id="chat-section" ref={chatRef} className="pt-2 sm:pt-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ask TyreAI</h2>
                <ChatInterface />
              </section>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
