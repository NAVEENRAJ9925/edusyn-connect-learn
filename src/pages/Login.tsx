import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, Mail, Lock, LogIn, User,
  BookOpen, Code, BookOpenCheck, Sparkles, Brain, Rocket, Eye, EyeOff
} from "lucide-react";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"student" | "staff">("student");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("edusyn_user");
    if (storedUser) navigate("/");
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        name: user.displayName || email.split("@")[0],
        email: user.email || email,
        role: userType,
        department: "General",
      };

      login(userData);
      if (rememberMe) {
        localStorage.setItem("edusyn_user", JSON.stringify(userData));
      }

      toast({ title: "Success", description: "Login successful" });
      navigate("/");
    } catch (err) {
      let errorMessage = "An error occurred";
      if (err instanceof Error) {
        switch (err.message) {
          case "Firebase: Error (auth/user-not-found).":
            errorMessage = "User not found";
            break;
          case "Firebase: Error (auth/wrong-password).":
            errorMessage = "Incorrect password";
            break;
          default:
            errorMessage = err.message;
        }
      }
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden cursor-gradient-beam">
      {/* Background decorations */}
      <div className="absolute w-72 h-72 bg-edusyn-500 rounded-full opacity-5 -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-teal-500 rounded-full opacity-5 -bottom-20 -right-20 animate-pulse" style={{ animationDuration: '7s' }}></div>
      <div className="absolute w-40 h-40 bg-purple-500 rounded-full opacity-5 top-1/4 right-10 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute w-60 h-60 bg-edusyn-600 rounded-full opacity-5 bottom-1/4 left-10 animate-pulse" style={{ animationDuration: '8s' }}></div>

      {/* Floating icons */}
      {[BookOpen, Code, User, BookOpenCheck, Sparkles, Brain, Rocket].map((Icon, idx) => (
        <div key={idx} className={`absolute text-white opacity-20 animate-float`} style={{ animationDuration: `${5 + idx}s`, top: `${10 + idx * 5}%`, left: `${idx % 2 === 0 ? '20%' : '70%'}` }}>
          <Icon size={32} />
        </div>
      ))}

      {/* Login Card */}
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
              {/* User Type Selection */}
              <div className="flex gap-2">
                {["student", "staff"].map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={userType === type ? "default" : "outline"}
                    className={`flex-1 ${userType === type ? "bg-edusyn-500 hover:bg-edusyn-600" : ""}`}
                    onClick={() => setUserType(type as "student" | "staff")}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-slate-300">
                  <Mail className="h-4 w-4 text-edusyn-400" /> Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800 border-slate-700 focus:border-edusyn-400 text-white"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="flex items-center gap-2 text-slate-300">
                    <Lock className="h-4 w-4 text-edusyn-400" /> Password
                  </Label>
                  <button
                    type="button"
                    onClick={() => alert("Redirect to Forgot Password page")}
                    className="text-xs text-edusyn-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-800 border-slate-700 focus:border-edusyn-400 text-white"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-slate-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2 text-slate-300">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-edusyn-500"
                />
                <Label htmlFor="rememberMe">Remember Me</Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  userType === "student"
                    ? "bg-gradient-to-r from-edusyn-500 to-teal-500"
                    : "bg-gradient-to-r from-teal-500 to-emerald-500"
                } hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    <span>Sign in</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
  <p className="text-sm text-slate-400">
    Logging in as: <span className="text-edusyn-400 font-semibold">{userType}</span>
  </p>
  <p className="text-sm text-slate-400">
    Don't have an account?{" "}
    <button
      onClick={() => navigate("/signup")}
      className="text-edusyn-400 hover:underline hover:text-edusyn-300 transition-all"
    >
      Sign up
    </button>
  </p>
</CardFooter>

        </Card>
      </div>
    </div>
  );
};

export default Login;
