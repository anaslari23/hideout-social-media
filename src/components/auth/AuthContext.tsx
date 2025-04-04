
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AuthService, { LoginData, RegisterUserData } from "../../services/authService";
import { saveAuthToken, saveRefreshToken, getAuthToken, saveUserData, getUserData, clearAuthData, isAuthenticated as checkIsAuthenticated } from "../../utils/authHelper";

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

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (checkIsAuthenticated()) {
          const userData = getUserData();
          if (userData) {
            setUser({
              userId: userData.user_id,
              username: userData.username,
              firstName: userData.full_name ? userData.full_name.split(' ')[0] : '',
              lastName: userData.full_name ? userData.full_name.split(' ')[1] || '' : '',
              profilePicUrl: userData.profile_picture_url,
              email: userData.email,
              isPrivate: userData.is_private
            });
          }
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
      const loginData: LoginData = { username, password };
      const response = await AuthService.login(loginData);
      
      if (response) {
        // Save tokens
        saveAuthToken(response.token);
        saveRefreshToken(response.refreshToken);
        
        // Transform and save user data
        const userData = {
          userId: response.user.user_id,
          username: response.user.username,
          firstName: response.user.full_name ? response.user.full_name.split(' ')[0] : 'User',
          lastName: response.user.full_name ? response.user.full_name.split(' ')[1] || '' : '',
          profilePicUrl: response.user.profile_picture_url,
          email: response.user.email,
          isPrivate: false // Set default value or get from API if available
        };
        
        setUser(userData);
        saveUserData(response.user);
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
      // In a real implementation, this would redirect to OAuth provider
      // and handle the callback. For this mock, we'll simulate a successful login
      
      // Mock data structure that would come from your backend
      const mockResponse = {
        user: {
          user_id: 2,
          username: `${provider.toLowerCase()}_user`,
          full_name: `${provider} User`,
          email: `${provider.toLowerCase()}@example.com`,
          profile_picture_url: `https://i.pravatar.cc/150?u=${provider.toLowerCase()}`,
        },
        token: "mock_token_for_" + provider,
        refreshToken: "mock_refresh_token_for_" + provider
      };
      
      saveAuthToken(mockResponse.token);
      saveRefreshToken(mockResponse.refreshToken);
      
      const userData = {
        userId: mockResponse.user.user_id,
        username: mockResponse.user.username,
        firstName: mockResponse.user.full_name.split(' ')[0],
        lastName: mockResponse.user.full_name.split(' ')[1] || '',
        profilePicUrl: mockResponse.user.profile_picture_url,
        email: mockResponse.user.email,
        isPrivate: false
      };
      
      setUser(userData);
      saveUserData(mockResponse.user);
      return true;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    clearAuthData();
  };
  
  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      const registerData: RegisterUserData = {
        username: userData.username,
        email: `${userData.username}@example.com`, // This would come from the form in a real app
        password: userData.password || '',
        full_name: `${userData.firstName} ${userData.lastName}`
      };
      
      const response = await AuthService.register(registerData);
      
      if (response) {
        // Auto-login after successful registration
        saveAuthToken(response.token);
        saveRefreshToken(response.refreshToken);
        
        const newUser = {
          userId: response.user.user_id,
          username: response.user.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: response.user.email,
          isPrivate: false
        };
        
        setUser(newUser);
        saveUserData(response.user);
        return true;
      }
      return false;
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
      // In a real implementation, this would verify OTP with backend
      // Mock successful verification with "1234" code
      return otp === "1234";
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
      // In a real implementation, this would send OTP via backend
      console.log(`OTP sent to ${phoneNumber}`);
      return true;
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
