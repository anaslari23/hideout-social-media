
import React from "react";
import Story from "./Story";
import { ScrollArea } from "@/components/ui/scroll-area";

const SAMPLE_STORIES = [
  { id: 1, username: "user1", avatar: "https://via.placeholder.com/64", hasUnseenStory: true },
  { id: 2, username: "user2", avatar: "https://via.placeholder.com/64", hasUnseenStory: true },
  { id: 3, username: "therock", avatar: "https://via.placeholder.com/64", hasUnseenStory: false },
  { id: 4, username: "user4", avatar: "https://via.placeholder.com/64", hasUnseenStory: true },
  { id: 5, username: "user5", avatar: "https://via.placeholder.com/64", hasUnseenStory: false },
  { id: 6, username: "user6", avatar: "https://via.placeholder.com/64", hasUnseenStory: true },
  { id: 7, username: "user7", avatar: "https://via.placeholder.com/64", hasUnseenStory: false },
];

const StoryRow: React.FC = () => {
  return (
    <div className="mb-6">
      <ScrollArea className="w-full">
        <div className="flex space-x-4 p-2">
          {SAMPLE_STORIES.map((story) => (
            <Story 
              key={story.id}
              username={story.username}
              avatar={story.avatar}
              hasUnseenStory={story.hasUnseenStory}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StoryRow;
