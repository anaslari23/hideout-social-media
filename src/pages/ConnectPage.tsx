
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, UserCheck, Users } from "lucide-react";

interface UserProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  isFollowing: boolean;
  mutualFriends?: number;
}

const UserCard: React.FC<UserProps> = ({ name, username, avatar, bio, isFollowing, mutualFriends }) => {
  const [following, setFollowing] = useState(isFollowing);
  
  return (
    <Card className="p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <img src={avatar} alt={name} className="rounded-full" />
          </Avatar>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold">{name}</h3>
              {mutualFriends && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                  {mutualFriends} mutual
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{username}</p>
            <p className="text-sm mt-1 line-clamp-2">{bio}</p>
          </div>
        </div>
        <Button
          variant={following ? "outline" : "default"}
          size="sm"
          onClick={() => setFollowing(!following)}
          className={following ? "" : "bg-purple-600 hover:bg-purple-700"}
        >
          {following ? (
            <><UserCheck className="h-4 w-4 mr-1" /> Following</>
          ) : (
            <><UserPlus className="h-4 w-4 mr-1" /> Follow</>
          )}
        </Button>
      </div>
    </Card>
  );
};

const ConnectPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const suggestedUsers: UserProps[] = [
    {
      id: "1",
      name: "Elena Rivera",
      username: "elenadesigns",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "UI/UX Designer with a passion for creating beautiful and intuitive user experiences.",
      isFollowing: false,
      mutualFriends: 3
    },
    {
      id: "2",
      name: "James Wilson",
      username: "jameswphoto",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Professional photographer specializing in portraits and landscape photography.",
      isFollowing: false,
      mutualFriends: 5
    },
    {
      id: "3",
      name: "Mei Lin",
      username: "meilin_art",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Digital artist and illustrator creating vibrant fantasy worlds and characters.",
      isFollowing: false,
      mutualFriends: 2
    },
    {
      id: "4",
      name: "Marcus Johnson",
      username: "marcusj",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Music producer and songwriter with a studio in downtown LA.",
      isFollowing: false,
      mutualFriends: 8
    }
  ];
  
  const followingUsers: UserProps[] = [
    {
      id: "5",
      name: "Aisha Patel",
      username: "aisha_designs",
      avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Fashion designer with a focus on sustainable and ethical fashion.",
      isFollowing: true
    },
    {
      id: "6",
      name: "Carlos Rodriguez",
      username: "carlos_r",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Filmmaker and screenwriter currently working on my first feature film.",
      isFollowing: true
    },
    {
      id: "7",
      name: "Sofia Lee",
      username: "sofialee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bio: "Graphic designer specializing in branding and identity design.",
      isFollowing: true
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Connect</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search people..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Tabs defaultValue="suggested">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="suggested" className="flex-1">
            <UserPlus className="h-4 w-4 mr-2" /> Suggested
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1">
            <UserCheck className="h-4 w-4 mr-2" /> Following
          </TabsTrigger>
          <TabsTrigger value="followers" className="flex-1">
            <Users className="h-4 w-4 mr-2" /> Followers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="suggested" className="space-y-4">
          {suggestedUsers.map(user => (
            <UserCard key={user.id} {...user} />
          ))}
        </TabsContent>
        
        <TabsContent value="following" className="space-y-4">
          {followingUsers.map(user => (
            <UserCard key={user.id} {...user} />
          ))}
        </TabsContent>
        
        <TabsContent value="followers" className="space-y-4">
          {followingUsers.map(user => (
            <UserCard key={user.id} {...user} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConnectPage;
