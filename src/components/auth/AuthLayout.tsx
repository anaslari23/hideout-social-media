
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
