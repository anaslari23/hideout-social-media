
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  MessageCircle,
  SkipForward
} from "lucide-react";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Login logic would go here
    console.log("Login attempt with:", username, password);
    
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/feed");
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Attempting to login with ${provider}`);
    
    // In a real implementation, this would redirect to the OAuth flow
    // For now, we'll simulate a successful login after a delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/feed");
    }, 1000);
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
            <input
              type="text"
              placeholder="User name"
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
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
              aria-label="Login with Instagram"
            >
              <Instagram size={16} />
            </button>
            <button 
              className="rounded-full p-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              onClick={() => handleSocialLogin("Facebook")}
              aria-label="Login with Facebook"
            >
              <Facebook size={16} />
            </button>
            <button 
              className="rounded-full p-2 bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
              onClick={() => handleSocialLogin("SMS")}
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
