
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Heart, Share2, MoreHorizontal, Send } from "lucide-react";

interface ThreadProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isLiked: boolean;
}

const ThreadCard: React.FC<ThreadProps> = ({ author, content, timestamp, likes, replies, isLiked }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <img src={author.avatar} alt={author.name} className="rounded-full" />
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">{author.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">@{author.username}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</span>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
          
          <p className="my-3">{content}</p>
          
          <div className="flex items-center space-x-4 mt-2">
            <button 
              className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              onClick={handleLike}
            >
              <Heart size={18} className={liked ? "fill-purple-600 text-purple-600" : ""} />
              <span>{likeCount}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
              <MessageSquare size={18} />
              <span>{replies}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ThreadsPage: React.FC = () => {
  const [threads, setThreads] = useState<ThreadProps[]>([
    {
      id: "1",
      author: {
        name: "Sofia Lee",
        username: "sofialee",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      content: "Just finished my latest design project! So excited to share more details soon. What do you all think of minimalist UI trends lately?",
      timestamp: "2h ago",
      likes: 24,
      replies: 5,
      isLiked: false
    },
    {
      id: "2",
      author: {
        name: "Marcus Johnson",
        username: "marcusj",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      content: "Working on a new music project that blends classical instruments with electronic beats. Been in the studio all week and can't wait to share a preview!",
      timestamp: "4h ago",
      likes: 42,
      replies: 8,
      isLiked: true
    },
    {
      id: "3",
      author: {
        name: "Aisha Patel",
        username: "aisha_designs",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      content: "Just got back from the photography conference in NYC. Met so many talented creators and learned some amazing new techniques!",
      timestamp: "6h ago",
      likes: 37,
      replies: 11,
      isLiked: false
    }
  ]);
  
  const [newThread, setNewThread] = useState("");
  
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newThread.trim()) return;
    
    const thread: ThreadProps = {
      id: Date.now().toString(),
      author: {
        name: "Current User",
        username: "currentuser",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      content: newThread,
      timestamp: "Just now",
      likes: 0,
      replies: 0,
      isLiked: false
    };
    
    setThreads(prev => [thread, ...prev]);
    setNewThread("");
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Threads</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <form onSubmit={handleCreateThread}>
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Your Avatar" 
                className="rounded-full"
              />
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="Start a thread..."
                value={newThread}
                onChange={(e) => setNewThread(e.target.value)}
                className="mb-3 w-full"
              />
              <div className="flex justify-end">
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Post Thread
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      <div className="space-y-4">
        {threads.map(thread => (
          <ThreadCard key={thread.id} {...thread} />
        ))}
      </div>
    </div>
  );
};

export default ThreadsPage;
