
import { Database, FileText, Search, Settings, Truck } from "lucide-react";
import QuickAction from "./QuickAction";

type QuickActionsProps = {
  onSelectAction: (question: string) => void;
};

const QuickActions = ({ onSelectAction }: QuickActionsProps) => {
  const quickActions = [
    {
      icon: Truck,
      title: "Manufacturing Process",
      description: "Learn about the tire manufacturing process from start to finish",
      question: "Explain the tire manufacturing process in detail."
    },
    {
      icon: Database,
      title: "Material Composition",
      description: "Get information on tire compounds and materials",
      question: "What materials are used in modern tire compounds?"
    },
    {
      icon: Settings,
      title: "Quality Control",
      description: "Understand quality testing procedures for tires",
      question: "How is quality control conducted in tire manufacturing?"
    },
    {
      icon: FileText,
      title: "Regulations",
      description: "Information on tire manufacturing regulations",
      question: "What are the key regulatory requirements for tire manufacturing?"
    },
    {
      icon: Search,
      title: "Troubleshooting",
      description: "Get help with common manufacturing issues",
      question: "What are common issues in tire manufacturing and how to resolve them?"
    },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {quickActions.map((action) => (
        <QuickAction
          key={action.title}
          icon={action.icon}
          title={action.title}
          description={action.description}
          onClick={() => onSelectAction(action.question)}
        />
      ))}
    </div>
  );
};

export default QuickActions;
