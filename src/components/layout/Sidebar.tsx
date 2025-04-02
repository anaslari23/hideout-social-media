
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Search, 
  Heart, 
  PlusSquare, 
  User,
  MessageCircle,
  Bell,
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
            <span className="font-medium">Home</span>
          </NavLink>
          
          <NavLink 
            to="/explore" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Search className="mr-3 h-5 w-5" />
            <span className="font-medium">Explore</span>
          </NavLink>
          
          <NavLink 
            to="/notifications" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Bell className="mr-3 h-5 w-5" />
            <span className="font-medium">Notifications</span>
          </NavLink>
          
          <NavLink 
            to="/messages" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            <span className="font-medium">Messages</span>
          </NavLink>
          
          <NavLink 
            to="/create" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <PlusSquare className="mr-3 h-5 w-5" />
            <span className="font-medium">Create</span>
          </NavLink>
          
          <NavLink 
            to="/activity" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <Heart className="mr-3 h-5 w-5" />
            <span className="font-medium">Activity</span>
          </NavLink>
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 rounded-lg ${
                isActive 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <User className="mr-3 h-5 w-5" />
            <span className="font-medium">Profile</span>
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
