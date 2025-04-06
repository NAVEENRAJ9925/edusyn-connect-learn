
import React from "react";
import { MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Sample data
const faculties = [
  {
    id: 1,
    name: "Dr. Janet Smith",
    department: "Computer Science",
    status: "available",
    location: "Room 301",
  },
  {
    id: 2,
    name: "Prof. David Lee",
    department: "Computer Science",
    status: "in-class",
    location: "Lab 104",
  },
  {
    id: 3,
    name: "Dr. Robert Johnson",
    department: "Computer Science",
    status: "available",
    location: "Office 205",
  },
];

const statusColors = {
  "available": "bg-green-100 text-green-800 hover:bg-green-100",
  "in-class": "bg-red-100 text-red-800 hover:bg-red-100",
  "meeting": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  "away": "bg-gray-100 text-gray-800 hover:bg-gray-100",
};

const FacultyStatus = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Faculty Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {faculties.map((faculty) => (
            <div key={faculty.id} className="flex items-center p-3 rounded-lg border border-border">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="" alt={faculty.name} />
                <AvatarFallback>
                  {faculty.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{faculty.name}</h3>
                  <Badge
                    variant="outline"
                    className={statusColors[faculty.status as keyof typeof statusColors]}
                  >
                    {faculty.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{faculty.department}</p>
                <div className="mt-1 flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {faculty.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FacultyStatus;
