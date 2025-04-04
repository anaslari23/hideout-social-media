
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  MessageCircle,
  SkipForward,
  X,
  AlertCircle
} from "lucide-react";
import AuthLayout from "./AuthLayout";
import { useAuth } from "./AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{username?: string; password?: string}>({});
  const { login, socialLogin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {username?: string; password?: string} = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await login(username, password);
    
    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome back to Hideout!",
      });
      navigate("/feed");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = async (provider: string) => {
    const success = await socialLogin(provider);
    
    if (success) {
      toast({
        title: `${provider} login successful`,
        description: "Welcome to Hideout!",
      });
      navigate("/feed");
    } else {
      toast({
        title: "Login failed",
        description: `Could not connect to ${provider}`,
        variant: "destructive",
      });
    }
  };

  const handleSkip = () => {
    console.log("Development mode: Skipping authentication");
    navigate("/feed");
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-center text-black mb-8">HIDEOUT</h1>
        
        <h2 className="text-xl font-semibold text-center text-black mb-6">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.username && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" /> {errors.username}
              </div>
            )}
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={14} className="mr-1" /> {errors.password}
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="flex items-center justify-center space-x-2 mt-6">
          <div className="border-t border-gray-300 flex-1"></div>
          <span className="text-sm text-gray-500 px-2">or</span>
          <div className="border-t border-gray-300 flex-1"></div>
        </div>
        
        <div className="text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </div>
        
        <div className="pt-4">
          <p className="text-center text-sm text-gray-500 mb-4">Get Started Using</p>
          <div className="flex justify-center space-x-4">
            <button 
              className="rounded-full p-2 bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              onClick={() => handleSocialLogin("Instagram")}
              disabled={isLoading}
              aria-label="Login with Instagram"
            >
              <Instagram size={16} />
            </button>
            <button 
              className="rounded-full p-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => handleSocialLogin("Facebook")}
              disabled={isLoading}
              aria-label="Login with Facebook"
            >
              <Facebook size={16} />
            </button>
            <button 
              className="rounded-full p-2 bg-slate-800 text-white hover:bg-slate-900 transition-colors"
              onClick={() => handleSocialLogin("X")}
              disabled={isLoading}
              aria-label="Login with X"
            >
              <X size={16} />
            </button>
            <button 
              className="rounded-full p-2 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
              onClick={() => handleSocialLogin("SMS")}
              disabled={isLoading}
              aria-label="Login with SMS"
            >
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
        
        {/* Skip button for dev purposes */}
        <div className="mt-6 text-center">
          <button 
            onClick={handleSkip}
            className="flex items-center mx-auto text-gray-500 hover:text-gray-800 text-sm py-2 px-4 rounded-full border border-dashed border-gray-300 hover:border-gray-400 transition-all"
          >
            <SkipForward size={16} className="mr-1" />
            <span>Skip for Development</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
