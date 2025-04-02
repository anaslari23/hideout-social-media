
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  MessageSquare,
  Users,
  Camera,
  Film,
  Headphones
} from "lucide-react";

const MobileNav: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-around py-3">
        <NavLink 
          to="/feed" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? "text-purple-600 scale-110" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Home className="h-6 w-6" />
          <span className={`mt-1 transition-all duration-200 ${
            location.pathname === "/feed" ? "text-sm font-medium" : "text-xs"
          }`}>Feed</span>
        </NavLink>
        
        <NavLink 
          to="/threads" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? "text-purple-600 scale-110" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <MessageSquare className="h-6 w-6" />
          <span className={`mt-1 transition-all duration-200 ${
            location.pathname === "/threads" ? "text-sm font-medium" : "text-xs"
          }`}>Threads</span>
        </NavLink>
        
        <NavLink 
          to="/connect" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? "text-purple-600 scale-110" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Users className="h-6 w-6" />
          <span className={`mt-1 transition-all duration-200 ${
            location.pathname === "/connect" ? "text-sm font-medium" : "text-xs"
          }`}>Connect</span>
        </NavLink>
        
        <NavLink 
          to="/quickpic" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? "text-purple-600 scale-110" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Camera className="h-6 w-6" />
          <span className={`mt-1 transition-all duration-200 ${
            location.pathname === "/quickpic" ? "text-sm font-medium" : "text-xs"
          }`}>QuickPic</span>
        </NavLink>
        
        <NavLink 
          to="/films" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? "text-purple-600 scale-110" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Film className="h-6 w-6" />
          <span className={`mt-1 transition-all duration-200 ${
            location.pathname === "/films" ? "text-sm font-medium" : "text-xs"
          }`}>Films</span>
        </NavLink>
        
        <NavLink 
          to="/spaces" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center transition-all duration-200 ${
              isActive ? "text-purple-600 scale-110" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Headphones className="h-6 w-6" />
          <span className={`mt-1 transition-all duration-200 ${
            location.pathname === "/spaces" ? "text-sm font-medium" : "text-xs"
          }`}>Spaces</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNav;
