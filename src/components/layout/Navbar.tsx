
import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <header className="border-b border-border">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="md:hidden mr-2">
          <SidebarTrigger />
        </div>
        
        <div className="hidden md:flex items-center w-full max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-edusyn-500" />
          </Button>
          
          <Avatar>
            <AvatarImage src="" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
