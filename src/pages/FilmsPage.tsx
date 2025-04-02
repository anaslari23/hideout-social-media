
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  Plus 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FilmProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  timestamp: string;
}

const FilmCard: React.FC<FilmProps> = ({
  author,
  thumbnail,
  title,
  description,
  duration,
  views,
  likes,
  comments,
  timestamp
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative group cursor-pointer">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <button className="bg-purple-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
            <Play className="h-8 w-8 fill-white" />
          </button>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {duration}
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex space-x-3">
          <Avatar>
            <img 
              src={author.avatar} 
              alt={author.name}
              className="rounded-full"
            />
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold line-clamp-2">{title}</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <span>{author.name}</span>
              {author.isVerified && (
                <span className="ml-1 bg-blue-500 rounded-full p-0.5">
                  <svg className="h-2 w-2 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {views.toLocaleString()} views • {timestamp}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-4 px-4">
        <div className="w-full flex justify-between">
          <Button variant="ghost" size="sm" className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            {likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            {comments}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const FilmsPage: React.FC = () => {
  const [films] = useState<FilmProps[]>([
    {
      id: "1",
      author: {
        name: "Carlos Rodriguez",
        username: "carlos_r",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        isVerified: true
      },
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "The Art of Visual Storytelling - Behind the Scenes",
      description: "A look at how we created the visual language for our latest short film.",
      duration: "18:24",
      views: 24500,
      likes: 1872,
      comments: 342,
      timestamp: "3 days ago"
    },
    {
      id: "2",
      author: {
        name: "Maya Williams",
        username: "maya_films",
        avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        isVerified: true
      },
      thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Documentary Film Techniques for Beginners",
      description: "Learn how to create compelling documentary films with basic equipment.",
      duration: "24:08",
      views: 18300,
      likes: 1230,
      comments: 187,
      timestamp: "1 week ago"
    },
    {
      id: "3",
      author: {
        name: "Alex Chen",
        username: "alexcreates",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "How to Create Cinematic B-Roll with a Smartphone",
      description: "Tips and tricks for professional-looking B-roll footage using just your phone.",
      duration: "12:45",
      views: 31200,
      likes: 2435,
      comments: 311,
      timestamp: "4 days ago"
    },
    {
      id: "4",
      author: {
        name: "Sofia Lee",
        username: "sofialee",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      thumbnail: "https://images.unsplash.com/photo-1518156677180-95a2893f3fdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      title: "Animation Workflow: From Concept to Final Render",
      description: "My complete process for creating animated short films from start to finish.",
      duration: "32:17",
      views: 12800,
      likes: 1045,
      comments: 142,
      timestamp: "2 weeks ago"
    }
  ]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Films</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-5 w-5 mr-2" /> Upload Film
        </Button>
      </div>
      
      <Tabs defaultValue="popular" className="mb-6">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="popular" className="flex-1">Popular</TabsTrigger>
          <TabsTrigger value="latest" className="flex-1">Latest</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {films.map(film => (
          <FilmCard key={film.id} {...film} />
        ))}
      </div>
    </div>
  );
};

export default FilmsPage;
