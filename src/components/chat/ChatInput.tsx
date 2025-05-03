
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
};

const ChatInput = ({ onSendMessage, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  // Listen for quick action events
  useEffect(() => {
    const handleQuickAction = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.question) {
        // Set the message and submit it after a short delay
        setMessage(customEvent.detail.question);
        setTimeout(() => {
          onSendMessage(customEvent.detail.question);
          setMessage("");
        }, 300);
      }
    };

    document.addEventListener("quickActionSelected", handleQuickAction);
    
    return () => {
      document.removeEventListener("quickActionSelected", handleQuickAction);
    };
  }, [onSendMessage]);
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <Button 
        type="button"
        size="icon"
        variant="outline"
        className="rounded-full flex-shrink-0"
        disabled={isLoading}
      >
        <Mic className="h-4 w-4" />
      </Button>
      
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything about tire manufacturing..."
        className="flex-1"
        disabled={isLoading}
      />
      
      <Button 
        type="submit"
        size="icon"
        className="rounded-full bg-primary hover:bg-primary-dark flex-shrink-0"
        disabled={!message.trim() || isLoading}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
