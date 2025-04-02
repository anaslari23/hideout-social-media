
import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface StoryProps {
  username: string;
  avatar: string;
  hasUnseenStory?: boolean;
}

const Story: React.FC<StoryProps> = ({ username, avatar, hasUnseenStory = false }) => {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className={`p-0.5 rounded-full ${hasUnseenStory ? "bg-gradient-to-tr from-purple-500 to-pink-500" : "bg-transparent"}`}>
        <div className="bg-white p-0.5 rounded-full">
          <Avatar className="h-16 w-16">
            <img 
              src={avatar} 
              alt={username}
              className="object-cover w-full h-full"
            />
          </Avatar>
        </div>
      </div>
      <span className="text-xs font-medium truncate w-16 text-center dark:text-white">
        {username}
      </span>
    </div>
  );
};

export default Story;
