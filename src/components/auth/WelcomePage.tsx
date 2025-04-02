
import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const WelcomePage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-2xl font-bold text-center text-black">HIDEOUT</h1>
        <Link 
          to="/login" 
          className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition-all">
          Get Started
        </Link>
      </div>
    </AuthLayout>
  );
};

export default WelcomePage;
