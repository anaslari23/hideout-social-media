
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  MessageCircle 
} from "lucide-react";
import AuthLayout from "./AuthLayout";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here
    console.log("Login attempt with:", username, password);
    // For now, we'll just redirect to the feed page
    window.location.href = "/feed";
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
          
          <button type="submit" className="auth-button">
            Login
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
            <button className="rounded-full p-2 bg-pink-500 text-white">
              <Instagram size={16} />
            </button>
            <button className="rounded-full p-2 bg-blue-600 text-white">
              <Facebook size={16} />
            </button>
            <button className="rounded-full p-2 bg-yellow-500 text-white">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
