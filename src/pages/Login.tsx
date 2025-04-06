
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, LogIn, User, BookOpen, Code, BookOpenCheck, Sparkles, Brain, Rocket } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden cursor-gradient-beam">
      {/* Background decorative elements */}
      <div className="absolute w-72 h-72 bg-edusyn-500 rounded-full opacity-5 -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-teal-500 rounded-full opacity-5 -bottom-20 -right-20 animate-pulse" style={{ animationDuration: '7s' }}></div>
      <div className="absolute w-40 h-40 bg-purple-500 rounded-full opacity-5 top-1/4 right-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute w-60 h-60 bg-edusyn-600 rounded-full opacity-5 bottom-1/4 left-10 animate-pulse" style={{ animationDuration: '8s' }}></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Floating icons */}
      <div className="absolute text-edusyn-400 opacity-20 top-1/3 left-1/4 animate-float" style={{ animationDuration: '5s' }}>
        <BookOpen size={32} className="cursor-dot" />
      </div>
      <div className="absolute text-teal-400 opacity-20 bottom-1/3 right-1/4 animate-float" style={{ animationDuration: '7s' }}>
        <Code size={32} className="cursor-ring" />
      </div>
      <div className="absolute text-purple-400 opacity-20 top-1/2 right-1/3 animate-float" style={{ animationDuration: '6s' }}>
        <User size={32} className="cursor-star" />
      </div>
      <div className="absolute text-emerald-400 opacity-20 bottom-2/3 left-1/3 animate-float" style={{ animationDuration: '4s' }}>
        <BookOpenCheck size={32} className="cursor-dot" />
      </div>
      <div className="absolute text-rose-400 opacity-20 top-1/4 right-1/4 animate-float" style={{ animationDuration: '9s' }}>
        <Sparkles size={32} className="cursor-ring" />
      </div>
      <div className="absolute text-amber-400 opacity-20 bottom-1/4 left-1/5 animate-float" style={{ animationDuration: '8s' }}>
        <Brain size={32} className="cursor-dot" />
      </div>
      <div className="absolute text-sky-400 opacity-20 top-2/3 right-1/5 animate-float" style={{ animationDuration: '10s' }}>
        <Rocket size={32} className="cursor-star" />
      </div>
      
      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 glass-dark p-3 rounded-full shadow-lg transform hover:scale-105 transition-all cursor-dot">
            <GraduationCap className="h-8 w-8 text-edusyn-400 animate-pulse-ring" />
            <span className="font-bold text-2xl text-slate-200">EduSyn</span>
          </div>
        </div>
        
        <Card className="neo-dark animate-fadeIn hover-glow transition-all hover:border-edusyn-400/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center gradient-text">Welcome Back</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-300">
                  <Mail className="h-4 w-4 text-edusyn-400" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="subil@2004"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="cursor-ring transition-all duration-200 bg-slate-800 border-slate-700 focus:border-edusyn-400 hover-border-glow text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="flex items-center gap-2 text-slate-300">
                    <Lock className="h-4 w-4 text-edusyn-400" />
                    Password
                  </Label>
                  <a href="#" className="text-xs text-edusyn-400 hover:text-edusyn-300 transition-colors hover:underline cursor-dot">
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
                    className="cursor-ring transition-all duration-200 bg-slate-800 border-slate-700 focus:border-edusyn-400 hover-border-glow text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-edusyn-500 to-teal-500 hover:from-edusyn-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-edusyn-900/20 hover:shadow-lg hover:shadow-edusyn-900/30 flex items-center justify-center gap-2 group cursor-star" 
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
            <p className="text-sm text-slate-400 px-3 py-1 glass-dark rounded-full border border-slate-700/30">
              Demo credentials: <span className="font-semibold text-edusyn-400">subil@2004</span> / <span className="font-semibold text-teal-400">password</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
