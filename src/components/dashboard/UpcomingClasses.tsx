
import React from "react";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data
const classes = [
  {
    id: 1,
    subject: "Computer Networks",
    time: "10:00 AM - 11:30 AM",
    faculty: "Dr. Janet Smith",
    location: "Room 301",
  },
  {
    id: 2,
    subject: "Database Systems",
    time: "01:00 PM - 02:30 PM",
    faculty: "Prof. David Lee",
    location: "Lab 104",
  },
  {
    id: 3,
    subject: "Software Engineering",
    time: "03:00 PM - 04:30 PM",
    faculty: "Dr. Robert Johnson",
    location: "Room 205",
  },
];

const UpcomingClasses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Today's Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {classes.map((cls) => (
            <div key={cls.id} className="flex items-start p-3 rounded-lg border border-border">
              <div className="mr-3 mt-1">
                <Clock className="h-5 w-5 text-edusyn-500" />
              </div>
              <div>
                <h3 className="font-medium">{cls.subject}</h3>
                <p className="text-sm text-muted-foreground">{cls.time}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 bg-edusyn-50 text-edusyn-600 rounded-full">
                    {cls.faculty}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-600 rounded-full">
                    {cls.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingClasses;
