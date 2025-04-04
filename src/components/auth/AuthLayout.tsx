
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Decorative area with gradient background */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">HIDEOUT</h1>
          <p className="text-white/90 mt-2">Your social world, your way.</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
            <p className="text-white text-lg">"Hideout is where I connect with my people. It's got everything I need in one place."</p>
            <p className="text-white/80 mt-4">- Satisfied User</p>
          </div>
          
          <div className="flex space-x-3">
            <div className="h-2 w-12 rounded-full bg-white/70"></div>
            <div className="h-2 w-12 rounded-full bg-white/30"></div>
            <div className="h-2 w-12 rounded-full bg-white/30"></div>
          </div>
        </div>
        
        <div className="text-white/70 text-sm">
          © {new Date().getFullYear()} Hideout. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ease-in-out">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
