
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
    <div className={cn("edusyn-card flex flex-col", className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 rounded-md bg-edusyn-50 text-edusyn-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
