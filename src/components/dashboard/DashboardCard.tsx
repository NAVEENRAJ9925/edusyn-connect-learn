
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}

const DashboardCard = ({ title, value, icon, className }: DashboardCardProps) => {
  return (
    <div className={cn(
      "edusyn-card flex flex-col animate-scaleIn cursor-pointer group",
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-edusyn-500">{title}</h3>
          <p className="text-2xl font-bold transition-all group-hover:text-edusyn-600 group-hover:scale-105">{value}</p>
        </div>
        <div className="p-2 rounded-md bg-edusyn-50 text-edusyn-500 transition-all duration-300 group-hover:bg-edusyn-100 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
