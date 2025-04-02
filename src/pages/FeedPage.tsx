
import React from "react";
import StoryRow from "@/components/feed/StoryRow";
import Post from "@/components/feed/Post";

const SAMPLE_POSTS = [
  {
    id: 1,
    username: "user1",
    userAvatar: "https://via.placeholder.com/40",
    postImage: "https://via.placeholder.com/600",
    caption: "This is an amazing view! #travel #adventure",
    likes: 124,
    comments: 14,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    username: "therock",
    userAvatar: "https://via.placeholder.com/40",
    postImage: "https://via.placeholder.com/600",
    caption: "Just another day at the gym 💪 #fitness #workout",
    likes: 2456,
    comments: 148,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    username: "traveler",
    userAvatar: "https://via.placeholder.com/40",
    caption: "Planning my next trip! Any suggestions? #travel #wanderlust",
    likes: 89,
    comments: 32,
    timestamp: "1 day ago"
  }
];

const FeedPage: React.FC = () => {
  return (
    <div>
      <StoryRow />
      
      <div className="space-y-6">
        {SAMPLE_POSTS.map((post) => (
          <Post 
            key={post.id}
            username={post.username}
            userAvatar={post.userAvatar}
            postImage={post.postImage}
            caption={post.caption}
            likes={post.likes}
            comments={post.comments}
            timestamp={post.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedPage;
