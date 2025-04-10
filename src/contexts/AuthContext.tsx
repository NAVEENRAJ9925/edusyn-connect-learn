// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User as FirebaseUser, signOut } from "firebase/auth";
import { auth } from "@/firebase.js";

interface AuthUser {
  uid: string; // Added uid for Firebase consistency
  name: string;
  email: string;
  role: "student" | "staff";
  department: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => Promise<void>; // Made async
  loading: boolean; // Added loading state
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // Initial loading state

  const login = (userData: AuthUser) => {
    localStorage.setItem("edusyn_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await signOut(auth); // Proper Firebase sign out
      localStorage.removeItem("edusyn_user");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (firebaseUser) {
        // Check localStorage first for existing data
        const storedUser = localStorage.getItem("edusyn_user");
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.email === firebaseUser.email) {
              setUser(parsedUser);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.warn("Failed to parse stored user data");
          }
        }

        // Default user data if nothing stored
        const userData: AuthUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
          email: firebaseUser.email || "",
          role: "student", // Default role
          department: "General"
        };
        
        login(userData);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};