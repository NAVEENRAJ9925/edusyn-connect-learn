
import React from "react";
import { Book, Calendar, MapPin, MessageCircle, UserCheck } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import UpcomingClasses from "@/components/dashboard/UpcomingClasses";
import RecentODRequests from "@/components/dashboard/RecentODRequests";
import FacultyStatus from "@/components/dashboard/FacultyStatus";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to Edusyn!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Attendance"
            value="89%"
            icon={<UserCheck className="h-5 w-5" />}
          />
          <DashboardCard
            title="Pending OD Requests"
            value="2"
            icon={<Calendar className="h-5 w-5" />}
          />
          <DashboardCard
            title="Faculty Messages"
            value="5"
            icon={<MessageCircle className="h-5 w-5" />}
          />
          <DashboardCard
            title="Courses Enrolled"
            value="6"
            icon={<Book className="h-5 w-5" />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AttendanceChart />
          <div className="space-y-4">
            <UpcomingClasses />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RecentODRequests />
          <FacultyStatus />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
