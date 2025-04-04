
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User type definition
export interface User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  profilePicUrl?: string;
  isPrivate?: boolean;
  email?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  socialLogin: (provider: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<boolean>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
  sendOtp: (phoneNumber: string) => Promise<boolean>;
}

// Signup data type
export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  password?: string;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API functions - these would be replaced with real API calls
const mockLogin = async (username: string, password: string): Promise<User | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes - in real life, this would be an API call
  if (username && password) {
    return {
      userId: 1,
      username,
      firstName: "Demo",
      lastName: "User",
      profilePicUrl: "https://i.pravatar.cc/150?u=demouser",
      isPrivate: false
    };
  }
  return null;
};

const mockSocialLogin = async (provider: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock social login - in real life this would connect to OAuth
  return {
    userId: 2,
    username: `${provider.toLowerCase()}_user`,
    firstName: provider,
    lastName: "User",
    profilePicUrl: `https://i.pravatar.cc/150?u=${provider.toLowerCase()}`,
    isPrivate: false
  };
};

const mockSignup = async (userData: SignupData): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return true; // Simulate successful signup
};

const mockVerifyOtp = async (phoneNumber: string, otp: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  // For demo purposes we'll consider "1234" as valid OTP
  return otp === "1234";
};

const mockSendOtp = async (phoneNumber: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  console.log(`OTP sent to ${phoneNumber}`);
  return true; // Simulate successful OTP sending
};

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to restore auth session:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockLogin(username, password);
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const socialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      const userData = await mockSocialLogin(provider);
      if (userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      const success = await mockSignup(userData);
      return success;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const verifyOtp = async (phoneNumber: string, otp: string) => {
    setIsLoading(true);
    try {
      return await mockVerifyOtp(phoneNumber, otp);
    } catch (error) {
      console.error("OTP verification failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendOtp = async (phoneNumber: string) => {
    setIsLoading(true);
    try {
      return await mockSendOtp(phoneNumber);
    } catch (error) {
      console.error("OTP sending failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    socialLogin,
    logout,
    signup,
    verifyOtp,
    sendOtp
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
