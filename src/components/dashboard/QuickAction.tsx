
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const QuickAction = ({
  icon: Icon,
  title,
  description,
  onClick,
  className,
}: QuickActionProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 border border-muted h-full",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-1 sm:pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary/10 p-1.5 sm:p-2.5 rounded-full">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <CardTitle className="text-sm sm:text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-4 pb-3 sm:pb-4">
        <CardDescription className="text-xs sm:text-sm line-clamp-2">{description}</CardDescription>
        <Button variant="link" className="text-primary p-0 h-auto mt-1 sm:mt-2 text-xs sm:text-sm font-medium">
          Ask Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAction;
