import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, Mail, Lock, LogIn, UserPlus 
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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"student" | "staff">("student");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      const userData = {
        uid: user.uid,
        name,
        email: user.email || email,
        role: userType,
        department: "General"
      };

      login(userData);

      toast({
        title: "Success",
        description: "Account created successfully",
      });

      navigate("/");
    } catch (err) {
      let errorMessage = "An error occurred";
      if (err instanceof Error) {
        if (err.message.includes("auth/email-already-in-use")) {
          errorMessage = "Email is already in use";
        } else {
          errorMessage = err.message;
        }
      }

      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 relative overflow-hidden cursor-gradient-beam">
      {/* Reuse background elements */}
      <div className="absolute w-72 h-72 bg-edusyn-500 rounded-full opacity-5 -top-10 -left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-teal-500 rounded-full opacity-5 -bottom-20 -right-20 animate-pulse" style={{ animationDuration: '7s' }}></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.07)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 glass-dark p-3 rounded-full shadow-lg transform hover:scale-105 transition-all cursor-dot">
            <GraduationCap className="h-8 w-8 text-edusyn-400 animate-pulse-ring" />
            <span className="font-bold text-2xl text-slate-200">EduSyn</span>
          </div>
        </div>

        <Card className="neo-dark animate-fadeIn hover-glow transition-all hover:border-edusyn-400/30">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center gradient-text">Create Account</CardTitle>
            <CardDescription className="text-center text-slate-400">
              Fill in your details to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={userType === "student" ? "default" : "outline"}
                  className={`flex-1 ${userType === "student" ? "bg-edusyn-500 hover:bg-edusyn-600" : ""}`}
                  onClick={() => setUserType("student")}
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant={userType === "staff" ? "default" : "outline"}
                  className={`flex-1 ${userType === "staff" ? "bg-teal-500 hover:bg-teal-600" : ""}`}
                  onClick={() => setUserType("staff")}
                >
                  Staff
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300 flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-edusyn-400" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="cursor-ring bg-slate-800 border-slate-700 focus:border-edusyn-400 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-edusyn-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cursor-ring bg-slate-800 border-slate-700 focus:border-edusyn-400 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-edusyn-400" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cursor-ring bg-slate-800 border-slate-700 focus:border-edusyn-400 text-white placeholder:text-slate-500"
                />
              </div>

              <Button 
                type="submit" 
                className={`w-full ${userType === "student" ? "bg-gradient-to-r from-edusyn-500 to-teal-500" : "bg-gradient-to-r from-teal-500 to-emerald-500"} hover:from-edusyn-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-star`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 group-hover:animate-pulse" />
                    <span>Sign Up</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-sm text-slate-400 px-3 py-1 glass-dark rounded-full border border-slate-700/30">
              Signing up as: <span className="font-semibold text-edusyn-400">{userType}</span>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
