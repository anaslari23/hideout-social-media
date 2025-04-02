
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Grid, Bookmark, Settings } from "lucide-react";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts");
  
  // Sample user data
  const user = {
    username: "johndoe",
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    bio: "Digital creator | Photography enthusiast | Travel lover",
    stats: {
      posts: 42,
      followers: 1564,
      following: 326
    }
  };
  
  // Sample posts
  const posts = Array(9).fill(0).map((_, i) => ({
    id: i,
    image: `https://via.placeholder.com/300?text=Post+${i+1}`,
    isVideo: i % 5 === 0,
  }));
  
  return (
    <div className="pb-16">
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8 pb-8 border-b dark:border-gray-700">
        <Avatar className="w-24 h-24 md:w-32 md:h-32">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="object-cover w-full h-full"
          />
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <h1 className="text-xl font-semibold dark:text-white">
              {user.username}
            </h1>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={() => window.location.href = "/settings"}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start space-x-6 my-4">
            <div>
              <span className="font-semibold dark:text-white">{user.stats.posts}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">posts</span>
            </div>
            <div>
              <span className="font-semibold dark:text-white">{user.stats.followers}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">followers</span>
            </div>
            <div>
              <span className="font-semibold dark:text-white">{user.stats.following}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">following</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h2 className="font-semibold dark:text-white">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
          </div>
        </div>
      </div>
      
      {/* Post tabs */}
      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="posts" className="flex items-center">
            <Grid className="h-4 w-4 mr-2" />
            <span>Posts</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center">
            <Bookmark className="h-4 w-4 mr-2" />
            <span>Saved</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-4">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="aspect-square relative overflow-hidden"
              >
                {post.isVideo ? (
                  <>
                    <video 
                      className="w-full h-full object-cover" 
                      src={post.image} 
                      muted 
                    />
                    <div className="absolute top-2 right-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <img 
                    src={post.image} 
                    alt={`Post ${post.id}`} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved" className="mt-4">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500 dark:text-gray-400">No saved posts yet.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
