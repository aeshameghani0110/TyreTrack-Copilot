
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
};

// Tire knowledge base - more comprehensive for better responses
const tireKnowledge = {
  manufacturing: `Tire manufacturing involves multiple complex stages:
1. Mixing: Raw materials like rubber, carbon black, and chemicals are blended
2. Component Preparation: Creating beads, sidewalls, plies, belts, and treads
3. Building: Assembling components on a drum to form a "green tire"
4. Curing: Vulcanization under heat and pressure to set the final shape
5. Finishing: Trimming, inspection, and quality testing`,
  
  materials: `Modern tire compounds contain:
- Natural rubber (polyisoprene) for elasticity and strength
- Synthetic rubber (SBR, BR) for specific performance characteristics
- Carbon black for reinforcement and UV protection
- Silica for improved rolling resistance
- Oils and plasticizers for flexibility
- Antioxidants and antiozonants for durability
- Steel, polyester, rayon, or nylon for structural reinforcement
- Sulfur and accelerators for vulcanization`,
  
  quality: `Quality control in tire manufacturing includes:
- Visual inspections for defects
- X-ray analysis for internal structural integrity
- Uniformity testing for balance and performance
- Durability testing on specialized machines
- Road testing in real-world conditions
- Compliance with safety standards (DOT, ECE)
- Statistical process control throughout manufacturing`,
  
  types: `Common tire types include:
- Summer tires: Optimized for dry/wet performance in warm weather
- Winter tires: Designed with special compounds and treads for snow and ice
- All-season tires: Balanced performance year-round
- Performance tires: Enhanced grip and handling at high speeds
- All-terrain tires: For both on and off-road use
- Mud-terrain tires: Specialized for off-road conditions
- Run-flat tires: Can continue operation after pressure loss`,
  
  maintenance: `Proper tire maintenance includes:
- Regular pressure checks (monthly recommended)
- Rotation every 5,000-8,000 miles
- Alignment when needed to prevent uneven wear
- Visual inspection for damage or unusual wear patterns
- Proper storage (cool, dry place away from sunlight)
- Replacement when tread depth reaches 2/32" (or when wear indicators show)`,
  
  innovations: `Recent tire innovations include:
- Self-sealing technologies to prevent flats
- Airless (non-pneumatic) designs eliminating the need for air pressure
- Smart tires with embedded sensors for monitoring
- Sustainable materials reducing environmental impact
- Reduced rolling resistance designs for improved fuel efficiency
- Noise-reducing technologies for quieter rides
- Advanced winter compounds for improved ice traction`
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello, I'm TyreAI, your tire manufacturing assistant. How can I help you today?",
    sender: "ai",
    timestamp: new Date(),
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Create and add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Process the message to generate a more intelligent response
    setTimeout(() => {
      const query = content.toLowerCase();
      
      // Generate contextual response based on the query
      const generateAIResponse = () => {
        // Check for specific topic matches
        if (query.includes("manufacturing") || query.includes("process") || query.includes("how") || query.includes("make")) {
          return tireKnowledge.manufacturing;
        }
        else if (query.includes("material") || query.includes("compound") || query.includes("rubber") || query.includes("made of")) {
          return tireKnowledge.materials;
        }
        else if (query.includes("quality") || query.includes("test") || query.includes("check") || query.includes("inspect")) {
          return tireKnowledge.quality;
        }
        else if (query.includes("type") || query.includes("kind") || query.includes("different")) {
          return tireKnowledge.types;
        }
        else if (query.includes("maintenance") || query.includes("care") || query.includes("maintain") || query.includes("pressure")) {
          return tireKnowledge.maintenance;
        }
        else if (query.includes("innovation") || query.includes("new") || query.includes("future") || query.includes("develop")) {
          return tireKnowledge.innovations;
        }
        // Default responses for common questions
        else if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
          return "Hello! I'm TyreAI, your tire manufacturing expert. How can I assist you today?";
        }
        else if (query.includes("thank")) {
          return "You're welcome! Feel free to ask if you have any other questions about tire manufacturing or technology.";
        }
        else {
          return "I'd be happy to help with your tire-related question. Could you please provide more details about what specific aspect of tire manufacturing, materials, or technology you'd like to learn about?";
        }
      };
      
      const aiResponse = generateAIResponse();
      
      const aiMessage: Message = {
        id: uuidv4(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="flex flex-col h-[75vh] border shadow-md">
      <CardHeader className="py-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <div className="bg-accent rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          TyreAI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-accent rounded-full animate-pulse-light"></div>
                <div className="h-2 w-2 bg-accent rounded-full animate-pulse-light delay-150"></div>
                <div className="h-2 w-2 bg-accent rounded-full animate-pulse-light delay-300"></div>
              </div>
              TyreAI is thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <div className="p-4 border-t">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </Card>
  );
};

export default ChatInterface;
