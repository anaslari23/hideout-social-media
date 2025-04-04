
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";

const WelcomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // If user is already logged in, redirect to feed
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed');
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-2xl font-bold text-center text-black">HIDEOUT</h1>
        <p className="text-center text-gray-600 max-w-xs">
          Connect with friends, share moments, and discover the world with Hideout.
        </p>
        <div className="space-y-3 w-full">
          <Link to="/login" className="block w-full">
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Login
            </Button>
          </Link>
          <Link to="/signup" className="block w-full">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default WelcomePage;
