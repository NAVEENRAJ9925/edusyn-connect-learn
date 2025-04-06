
import React from "react";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Sample data
const requests = [
  {
    id: 1,
    reason: "College Cultural Event",
    date: "Apr 10, 2025",
    status: "approved",
  },
  {
    id: 2,
    reason: "Medical Appointment",
    date: "Apr 15, 2025",
    status: "pending",
  },
  {
    id: 3,
    reason: "Inter-College Competition",
    date: "Apr 20, 2025",
    status: "pending",
  },
];

const RecentODRequests = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">Recent OD Requests</CardTitle>
        <Button variant="outline" size="sm" className="h-8">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-start p-3 rounded-lg border border-border">
              <div className="mr-3 mt-1">
                <Calendar className="h-5 w-5 text-edusyn-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{request.reason}</h3>
                  <Badge
                    variant={request.status === "approved" ? "default" : "secondary"}
                    className={
                      request.status === "approved"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {request.status === "approved" ? (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                      <Clock className="mr-1 h-3 w-3" />
                    )}
                    {request.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{request.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentODRequests;
