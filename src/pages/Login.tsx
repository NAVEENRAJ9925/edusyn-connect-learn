
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, LogIn, User, BookOpen, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("edusyn_user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate login delay
    setTimeout(() => {
      // Demo credentials check
      if (email === "subil@2004" && password === "password") {
        const userData = {
          name: "Subil",
          email: "subil@2004",
          role: "student",
          department: "Computer Science"
        };
        
        // Save user data and update auth context
        login(userData);
        
        toast({
          title: "Success",
          description: "You have successfully logged in!",
        });
        
        navigate("/");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try subil@2004 / password",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-edusyn-50 via-teal-50 to-edusyn-100 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute w-72 h-72 bg-teal-300 rounded-full opacity-10 -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-edusyn-400 rounded-full opacity-10 -bottom-20 -right-20 animate-pulse" style={{ animationDuration: '7s' }}></div>
      <div className="absolute w-40 h-40 bg-edusyn-300 rounded-full opacity-10 top-1/4 right-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute w-60 h-60 bg-teal-400 rounded-full opacity-10 bottom-1/4 left-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Floating icons */}
      <div className="absolute text-edusyn-300 opacity-20 top-1/3 left-1/4 animate-bounce" style={{ animationDuration: '5s' }}>
        <BookOpen size={32} />
      </div>
      <div className="absolute text-teal-400 opacity-20 bottom-1/3 right-1/4 animate-bounce" style={{ animationDuration: '7s' }}>
        <Code size={32} />
      </div>
      <div className="absolute text-edusyn-400 opacity-20 top-1/2 right-1/3 animate-bounce" style={{ animationDuration: '6s' }}>
        <User size={32} />
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-white/40 p-3 rounded-full backdrop-blur-sm border border-white/50 shadow-lg transform hover:scale-105 transition-all cursor-pointer">
            <GraduationCap className="h-8 w-8 text-edusyn-600" />
            <span className="font-bold text-2xl text-edusyn-700">EduSyn</span>
          </div>
        </div>
        
        <Card className="border-edusyn-100 shadow-xl animate-fadeIn backdrop-blur-sm bg-white/80 transition-all hover:shadow-edusyn-200/30 hover:translate-y-[-2px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-edusyn-600 to-teal-600 bg-clip-text text-transparent">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-edusyn-700">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="subil@2004"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-200 focus:border-edusyn-400 pr-10 pl-4 backdrop-blur-sm bg-white/50 border-edusyn-100 focus:ring-2 focus:ring-edusyn-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="flex items-center gap-2 text-edusyn-700">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <a href="#" className="text-xs text-edusyn-500 hover:text-edusyn-600 transition-colors hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="transition-all duration-200 focus:border-edusyn-400 pr-10 pl-4 backdrop-blur-sm bg-white/50 border-edusyn-100 focus:ring-2 focus:ring-edusyn-200"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-edusyn-500 to-teal-500 hover:from-edusyn-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 group" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 group-hover:animate-pulse" />
                    <span>Sign in</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground px-3 py-1 bg-edusyn-50/50 rounded-full border border-edusyn-100/30">
              Demo credentials: <span className="font-semibold text-edusyn-600">subil@2004</span> / <span className="font-semibold text-teal-600">password</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
