
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  MoreHorizontal,
  Camera
} from "lucide-react";

interface QuickPicProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
}

const QuickPicCard: React.FC<QuickPicProps> = ({
  author,
  image,
  caption,
  timestamp,
  likes,
  comments,
  isLiked,
  isSaved
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [saved, setSaved] = useState(isSaved);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <img 
              src={author.avatar} 
              alt={author.name}
              className="rounded-full"
            />
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">@{author.username}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="relative aspect-square w-full overflow-hidden">
        <img 
          src={image} 
          alt="QuickPic" 
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLike}
              className={liked ? "text-red-500" : ""}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-red-500" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSaved(!saved)}
          >
            <Bookmark className={`h-6 w-6 ${saved ? "fill-black dark:fill-white" : ""}`} />
          </Button>
        </div>
        
        <p className="font-medium mb-1">{likeCount} likes</p>
        <p><span className="font-medium">{author.username}</span> {caption}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          View all {comments} comments
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{timestamp}</p>
      </div>
    </Card>
  );
};

const QuickPicPage: React.FC = () => {
  const [quickPics] = useState<QuickPicProps[]>([
    {
      id: "1",
      author: {
        name: "Sofia Lee",
        username: "sofialee",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      caption: "Coffee break during the design sprint ☕",
      timestamp: "2 hours ago",
      likes: 142,
      comments: 24,
      isLiked: false,
      isSaved: false
    },
    {
      id: "2",
      author: {
        name: "Marcus Johnson",
        username: "marcusj",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      caption: "New music studio setup for the upcoming album 🎹🎧",
      timestamp: "5 hours ago",
      likes: 287,
      comments: 42,
      isLiked: true,
      isSaved: true
    },
    {
      id: "3",
      author: {
        name: "Aisha Patel",
        username: "aisha_designs",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      caption: "Latest fashion design coming together! What do you think of the color palette?",
      timestamp: "1 day ago",
      likes: 328,
      comments: 56,
      isLiked: false,
      isSaved: false
    }
  ]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">QuickPic</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Camera className="h-5 w-5 mr-2" /> New QuickPic
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:max-w-3xl mx-auto">
        {quickPics.map(pic => (
          <QuickPicCard key={pic.id} {...pic} />
        ))}
      </div>
    </div>
  );
};

export default QuickPicPage;
