
import { Home, MessageSquare, Database, BarChart3, Settings, HelpCircle, FileText, Search, Truck, CarFront } from "lucide-react";

export const menuItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "TyreAI Chat", href: "/chat" },
  { icon: CarFront, label: "Passenger Tyres", href: "/passenger" },
  { icon: Truck, label: "Commercial Tyres", href: "/commercial" },
  { icon: Database, label: "Knowledge Base", href: "/knowledge" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Documents", href: "/documents" },
];

export const bottomItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/support" },
];
