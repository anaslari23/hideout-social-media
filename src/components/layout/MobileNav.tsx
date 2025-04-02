
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  MessageSquare,
  Users,
  Camera,
  Film,
  Headphones
} from "lucide-react";

const MobileNav: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-around py-3">
        <NavLink 
          to="/feed" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Feed</span>
        </NavLink>
        
        <NavLink 
          to="/threads" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs mt-1">Threads</span>
        </NavLink>
        
        <NavLink 
          to="/connect" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Users className="h-6 w-6" />
          <span className="text-xs mt-1">Connect</span>
        </NavLink>
        
        <NavLink 
          to="/quickpic" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Camera className="h-6 w-6" />
          <span className="text-xs mt-1">QuickPic</span>
        </NavLink>
        
        <NavLink 
          to="/films" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Film className="h-6 w-6" />
          <span className="text-xs mt-1">Films</span>
        </NavLink>
        
        <NavLink 
          to="/spaces" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Headphones className="h-6 w-6" />
          <span className="text-xs mt-1">Spaces</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNav;
