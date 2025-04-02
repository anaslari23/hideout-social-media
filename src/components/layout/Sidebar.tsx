
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  MessageSquare, 
  Users, 
  Camera,
  Film,
  Headphones,
  Settings
} from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">HIDEOUT</h1>
        
        <nav className="space-y-4">
          <NavLink 
            to="/feed" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Home className="mr-3 h-5 w-5" />
            <span className="font-medium">Feed</span>
          </NavLink>
          
          <NavLink 
            to="/threads" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            <span className="font-medium">Threads</span>
          </NavLink>
          
          <NavLink 
            to="/connect" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Users className="mr-3 h-5 w-5" />
            <span className="font-medium">Connect</span>
          </NavLink>
          
          <NavLink 
            to="/quickpic" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Camera className="mr-3 h-5 w-5" />
            <span className="font-medium">QuickPic</span>
          </NavLink>
          
          <NavLink 
            to="/films" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Film className="mr-3 h-5 w-5" />
            <span className="font-medium">Films</span>
          </NavLink>
          
          <NavLink 
            to="/spaces" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Headphones className="mr-3 h-5 w-5" />
            <span className="font-medium">Spaces</span>
          </NavLink>
        </nav>
      </div>
      
      <div className="absolute bottom-8 left-0 w-full px-6">
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex items-center px-4 py-3 rounded-lg ${
              isActive 
                ? "bg-gray-100 dark:bg-gray-700" 
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          <Settings className="mr-3 h-5 w-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
