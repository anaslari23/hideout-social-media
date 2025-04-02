
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        <div className="container py-6 px-4 max-w-4xl mx-auto">
          <Outlet />
        </div>
      </div>
      
      {/* Mobile navigation - visible only on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10">
        <MobileNav />
      </div>
    </div>
  );
};

export default MainLayout;
