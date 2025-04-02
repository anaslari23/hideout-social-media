
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
      
      <div className="flex-1 flex flex-col">
        {/* Mobile navigation - visible only on mobile at the top */}
        <div className="md:hidden sticky top-0 z-10">
          <MobileNav />
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="container py-6 px-4 max-w-4xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
