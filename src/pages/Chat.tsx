
import React, { useState } from "react";
import { Send, User, Clock, UserCheck, MessageCircle, Search, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLayout from "@/components/layout/AppLayout";

// Dummy data for faculty
const faculty = [
  { id: 1, name: "Dr. Janet Smith", department: "Computer Science", status: "Available", lastActive: "2 mins ago" },
  { id: 2, name: "Prof. David Lee", department: "Database Systems", status: "In Class", lastActive: "1 hour ago" },
  { id: 3, name: "Dr. Robert Johnson", department: "Software Engineering", status: "Busy", lastActive: "5 mins ago" },
  { id: 4, name: "Dr. Emily Chen", department: "AI & Machine Learning", status: "Available", lastActive: "Just now" },
  { id: 5, name: "Prof. Michael Brown", department: "Cybersecurity", status: "Meeting", lastActive: "3 hours ago" },
];

// Dummy messages
const initialMessages = [
  { id: 1, sender: "Dr. Janet Smith", message: "Hello, how can I help you today?", time: "10:30 AM", isFaculty: true },
  { id: 2, sender: "You", message: "I had a question about the latest assignment", time: "10:32 AM", isFaculty: false },
  { id: 3, sender: "Dr. Janet Smith", message: "Sure, what specifically are you having trouble with?", time: "10:35 AM", isFaculty: true },
];

const Chat = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = faculty.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFaculty: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate faculty response
    setTimeout(() => {
      const facultyResponse = {
        id: messages.length + 2,
        sender: "Dr. Janet Smith",
        message: "I'll look into this and get back to you soon.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFaculty: true
      };
      setMessages(prev => [...prev, facultyResponse]);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "Busy":
        return "bg-red-500";
      case "In Class":
        return "bg-orange-500";
      case "Meeting":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-80px)] flex cursor-gradient-beam">
        {/* Faculty Sidebar */}
        <div className="w-80 border-r border-border overflow-auto glass-dark">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/70" />
              <Input
                type="search"
                placeholder="Search faculty..."
                className="w-full pl-8 border-slate-700 bg-slate-800/50 text-white placeholder:text-white/50 focus:border-edusyn-400 hover-border-glow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <h3 className="text-lg font-semibold mb-2 gradient-text-dark">Faculty</h3>
            
            <div className="space-y-2">
              {filteredFaculty.map((f) => (
                <div 
                  key={f.id}
                  className={`p-3 rounded-lg cursor-pointer hover-lift hover-border-glow ${
                    activeChat === f.id 
                      ? "bg-slate-800 border border-slate-700" 
                      : "hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveChat(f.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-slate-700 cursor-star">
                      <AvatarImage src="" alt={f.name} />
                      <AvatarFallback className="bg-edusyn-600">{f.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{f.name}</h4>
                        <span className="text-xs text-slate-400">{f.lastActive}</span>
                      </div>
                      <p className="text-sm text-slate-400 truncate">{f.department}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${getStatusColor(f.status)}`}></span>
                        <span className="text-xs">{f.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-700 flex items-center">
            <Avatar className="cursor-dot">
              <AvatarImage src="" alt="Dr. Janet Smith" />
              <AvatarFallback className="bg-edusyn-600">JS</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <h3 className="font-medium text-white">Dr. Janet Smith</h3>
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                <span className="text-xs text-slate-300">Available</span>
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isFaculty ? "justify-start" : "justify-end"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 animate-fadeIn ${
                    msg.isFaculty 
                      ? "bg-slate-700 text-white rounded-tl-none" 
                      : "bg-edusyn-600 text-white rounded-tr-none"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{msg.sender}</span>
                    <span className="text-xs opacity-70 ml-2">{msg.time}</span>
                  </div>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-700 bg-slate-800/80">
            <div className="flex items-center gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-ring"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              
              <Input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus:border-edusyn-400 hover-border-glow"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-edusyn-500 to-edusyn-600 hover:from-edusyn-600 hover:to-edusyn-700 text-white cursor-dot"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
