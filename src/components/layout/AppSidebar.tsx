
import React from "react";
import { Calendar, GraduationCap, Home, MessageCircle, MapPin, UserCheck, BookOpen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

// Menu items
const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Chat with Faculty",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "OD Requests",
    url: "/od-requests",
    icon: Calendar,
  },
  {
    title: "Faculty Locator",
    url: "/faculty-locator",
    icon: MapPin,
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: UserCheck,
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
  },
];

const AppSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 flex items-center">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-edusyn-500" />
          <span className="font-bold text-xl text-edusyn-700">EduSyn</span>
        </div>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url} 
                      className={`flex items-center gap-3 transition-all duration-200 ${
                        location.pathname === item.url 
                          ? "text-edusyn-600 font-medium bg-edusyn-50" 
                          : "hover:text-edusyn-500 hover:bg-edusyn-50"
                      }`}
                    >
                      <item.icon className={`h-5 w-5 ${
                        location.pathname === item.url
                          ? "text-edusyn-500"
                          : ""
                      }`} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <Avatar className="border-2 border-edusyn-100 hover:border-edusyn-300 transition-all">
            <AvatarImage src="" alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name?.split(' ').map(n => n[0]).join('') || "US"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || "User Name"}</span>
            <span className="text-xs text-muted-foreground">{user?.department || "Department"}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
