
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-edusyn-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-edusyn-500" />
            <span className="font-bold text-2xl text-edusyn-700">EduSyn</span>
          </div>
        </div>
        
        <Card className="border-edusyn-100 shadow-lg animate-fadeIn">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="subil@2004"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all duration-200 focus:border-edusyn-400"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-edusyn-500 hover:text-edusyn-600 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-all duration-200 focus:border-edusyn-400"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-edusyn-500 hover:bg-edusyn-600 transition-colors" 
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Demo credentials: subil@2004 / password
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
