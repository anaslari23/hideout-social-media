
import React from "react";
import { Avatar } from "@/components/ui/avatar";

const SAMPLE_NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    user: {
      username: "user1",
      avatar: "https://via.placeholder.com/40",
    },
    content: "liked your photo",
    time: "2h",
    seen: false,
  },
  {
    id: 2,
    type: "follow",
    user: {
      username: "therock",
      avatar: "https://via.placeholder.com/40",
    },
    content: "started following you",
    time: "1d",
    seen: true,
  },
  {
    id: 3,
    type: "comment",
    user: {
      username: "traveler",
      avatar: "https://via.placeholder.com/40",
    },
    content: "commented on your post: \"Great shot!\"",
    time: "3d",
    seen: true,
  },
  {
    id: 4,
    type: "mention",
    user: {
      username: "user5",
      avatar: "https://via.placeholder.com/40",
    },
    content: "mentioned you in a comment",
    time: "5d",
    seen: true,
  },
];

const NotificationsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Notifications</h1>
      
      <div className="space-y-1">
        {SAMPLE_NOTIFICATIONS.map((notification) => (
          <div 
            key={notification.id}
            className={`flex items-center p-3 rounded-lg ${
              !notification.seen 
                ? "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20" 
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <Avatar className="h-12 w-12 mr-4">
              <img 
                src={notification.user.avatar} 
                alt={notification.user.username}
                className="object-cover w-full h-full"
              />
            </Avatar>
            
            <div className="flex-1">
              <p className="dark:text-white">
                <span className="font-semibold">{notification.user.username}</span>
                {" "}
                {notification.content}
              </p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {notification.time}
              </span>
            </div>
            
            {!notification.seen && (
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
