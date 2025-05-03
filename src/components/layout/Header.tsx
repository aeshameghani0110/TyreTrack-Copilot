
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { menuItems, bottomItems } from "./mobilemenu-data";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary sticky top-0 w-full z-10 shadow-md">
      <div className="container px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" className="text-white hover:bg-primary-dark p-1.5 sm:p-2 rounded-md lg:hidden">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh] px-2">
              <div className="mx-auto w-full max-w-sm pt-4 sm:pt-6">
                <div className="flex flex-col items-center mb-4 sm:mb-6">
                  <div className="bg-primary rounded-full p-1 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>
                  <div className="font-bold text-lg sm:text-xl">TyreAI</div>
                  <div className="text-xs sm:text-sm text-gray-500">Manufacturing Assistant</div>
                </div>

                <div className="space-y-3 sm:space-y-4 px-2 sm:px-4">
                  <h3 className="text-xs sm:text-sm font-medium">Menu</h3>
                  <nav className="grid gap-1 sm:gap-2">
                    {menuItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 sm:gap-3 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-100"
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        {item.label}
                      </a>
                    ))}
                  </nav>

                  <h3 className="text-xs sm:text-sm font-medium pt-3 sm:pt-4 border-t">Support</h3>
                  <nav className="grid gap-1 sm:gap-2">
                    {bottomItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 sm:gap-3 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-100"
                      >
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          <SidebarTrigger className="text-white hover:bg-primary-dark p-1.5 sm:p-2 rounded-md hidden lg:flex">
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </SidebarTrigger>

          <div className="text-white font-bold text-sm sm:text-xl flex items-center gap-1 sm:gap-2">
            <div className="bg-white rounded-full p-0.5 sm:p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0c4da2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 sm:h-6 sm:w-6"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <span className="hidden xs:inline">TyreAI Assistant</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-gray-100 px-2 py-1 h-auto text-xs sm:text-sm sm:px-3 sm:py-1.5 sm:h-auto">
            Dashboard
          </Button>
          <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-gray-100 px-2 py-1 h-auto text-xs sm:text-sm sm:px-3 sm:py-1.5 sm:h-auto">
            Support
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
