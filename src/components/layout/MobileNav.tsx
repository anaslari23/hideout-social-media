
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Search, 
  PlusSquare, 
  Heart, 
  User
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
        </NavLink>
        
        <NavLink 
          to="/explore" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Search className="h-6 w-6" />
        </NavLink>
        
        <NavLink 
          to="/create" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <PlusSquare className="h-6 w-6" />
        </NavLink>
        
        <NavLink 
          to="/activity" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Heart className="h-6 w-6" />
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center ${
              isActive ? "text-purple-600" : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <User className="h-6 w-6" />
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNav;
