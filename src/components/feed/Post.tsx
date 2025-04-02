
import React, { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface PostProps {
  username: string;
  userAvatar?: string;
  postImage?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isVideo?: boolean;
}

const Post: React.FC<PostProps> = ({
  username,
  userAvatar,
  postImage,
  caption,
  likes,
  comments,
  timestamp,
  isVideo = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      {/* Post header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border">
            <img 
              src={userAvatar || "https://via.placeholder.com/40"} 
              alt={username}
              className="object-cover w-full h-full"
            />
          </Avatar>
          <span className="font-medium dark:text-white">{username}</span>
        </div>
        <button className="text-gray-500 dark:text-gray-400">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      
      {/* Post content */}
      {isVideo ? (
        <div className="aspect-square bg-black">
          <video 
            className="w-full h-full object-contain" 
            src={postImage}
            controls
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        postImage && (
          <div className="aspect-square bg-black">
            <img 
              src={postImage} 
              alt="Post content" 
              className="w-full h-full object-contain" 
            />
          </div>
        )
      )}
      
      {/* Post actions */}
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-3">
          <button 
            className={`${liked ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}
            onClick={handleLike}
          >
            <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            <Share className="h-6 w-6" />
          </button>
        </div>
        
        {/* Likes count */}
        <p className="font-medium dark:text-white">{likeCount} likes</p>
        
        {/* Caption */}
        <p className="mt-1 dark:text-gray-200">
          <span className="font-medium dark:text-white">{username}</span>{" "}
          {caption}
        </p>
        
        {/* Comments link */}
        {comments > 0 && (
          <button className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            View all {comments} comments
          </button>
        )}
        
        {/* Timestamp */}
        <p className="text-gray-400 text-xs mt-1">{timestamp}</p>
      </div>
    </div>
  );
};

export default Post;
