
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Headphones, 
  Calendar, 
  Clock, 
  Users, 
  Mic, 
  MicOff,
  Plus
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface SpaceProps {
  id: string;
  title: string;
  description: string;
  schedule: {
    date: string;
    time: string;
  };
  status: "live" | "upcoming" | "ended";
  hosts: {
    name: string;
    username: string;
    avatar: string;
  }[];
  participants: {
    name: string;
    avatar: string;
  }[];
  participantCount: number;
  topics: string[];
}

const SpaceCard: React.FC<SpaceProps> = ({
  title,
  description,
  schedule,
  status,
  hosts,
  participants,
  participantCount,
  topics
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge 
              variant={status === "live" ? "destructive" : status === "upcoming" ? "default" : "secondary"}
              className={status === "live" ? "bg-red-500" : ""}
            >
              {status === "live" ? "LIVE NOW" : status === "upcoming" ? "Upcoming" : "Ended"}
            </Badge>
            <h3 className="text-lg font-bold mt-2">{title}</h3>
          </div>
          
          {status === "upcoming" && (
            <div className="text-right">
              <div className="flex items-center justify-end text-sm mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{schedule.date}</span>
              </div>
              <div className="flex items-center justify-end text-sm">
                <Clock className="h-4 w-4 mr-1" />
                <span>{schedule.time}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Hosts:</p>
          <div className="flex flex-wrap gap-2">
            {hosts.map((host, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <img src={host.avatar} alt={host.name} className="rounded-full" />
                </Avatar>
                <span className="text-sm font-medium">{host.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Participants ({participantCount})
            </p>
            <Button variant="ghost" size="sm" className="text-xs">See all</Button>
          </div>
          
          <AvatarGroup>
            {participants.map((participant, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-background">
                <img src={participant.avatar} alt={participant.name} className="rounded-full" />
              </Avatar>
            ))}
            {participantCount > participants.length && (
              <Avatar className="h-8 w-8 border-2 border-background">
                <span className="text-xs">+{participantCount - participants.length}</span>
              </Avatar>
            )}
          </AvatarGroup>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Topics:</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, i) => (
              <Badge key={i} variant="outline" className="rounded-full">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${status === "live" ? "bg-red-500 hover:bg-red-600" : 
            status === "upcoming" ? "bg-purple-600 hover:bg-purple-700" : 
            "bg-gray-400 hover:bg-gray-500"}`}
          disabled={status === "ended"}
        >
          {status === "live" ? (
            <>
              <Headphones className="h-5 w-5 mr-2" /> Join Live
            </>
          ) : status === "upcoming" ? (
            <>
              <Calendar className="h-5 w-5 mr-2" /> Set Reminder
            </>
          ) : (
            <>
              <Headphones className="h-5 w-5 mr-2" /> Replay
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

const SpacesPage: React.FC = () => {
  const [spaces] = useState<SpaceProps[]>([
    {
      id: "1",
      title: "The Future of AI in Creative Industries",
      description: "Join us for a discussion on how artificial intelligence is transforming creative work across design, art, and media.",
      schedule: {
        date: "Today",
        time: "2:00 PM"
      },
      status: "live",
      hosts: [
        {
          name: "Alex Chen",
          username: "alexcreates",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        },
        {
          name: "Maya Williams",
          username: "maya_films",
          avatar: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ],
      participants: [
        { name: "User 1", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { name: "User 2", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { name: "User 3", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { name: "User 4", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
      ],
      participantCount: 87,
      topics: ["AI", "Creative Tech", "Digital Art", "Future of Work"]
    },
    {
      id: "2",
      title: "Music Production Masterclass",
      description: "Learn advanced music production techniques from industry professionals with years of experience.",
      schedule: {
        date: "Tomorrow",
        time: "7:30 PM"
      },
      status: "upcoming",
      hosts: [
        {
          name: "Marcus Johnson",
          username: "marcusj",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ],
      participants: [
        { name: "User 1", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { name: "User 2", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { name: "User 3", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
      ],
      participantCount: 42,
      topics: ["Music Production", "Audio Engineering", "Songwriting"]
    },
    {
      id: "3",
      title: "Fashion Design Trends 2023",
      description: "A conversation about the emerging fashion trends in 2023 and their impact on sustainable fashion.",
      schedule: {
        date: "Yesterday",
        time: "5:00 PM"
      },
      status: "ended",
      hosts: [
        {
          name: "Aisha Patel",
          username: "aisha_designs",
          avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
        }
      ],
      participants: [
        { name: "User 1", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
        { name: "User 2", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
      ],
      participantCount: 113,
      topics: ["Fashion", "Sustainable Design", "Trends"]
    }
  ]);
  
  const [activeSpace, setActiveSpace] = useState<SpaceProps | null>(
    spaces.find(space => space.status === "live") || null
  );
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Spaces</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-5 w-5 mr-2" /> Create Space
        </Button>
      </div>
      
      {activeSpace && activeSpace.status === "live" && (
        <Card className="mb-8 bg-gradient-to-r from-purple-700 to-purple-900 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-red-500">LIVE NOW</Badge>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{activeSpace.participantCount} listening</span>
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-3">{activeSpace.title}</h2>
            <p className="mb-6">{activeSpace.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm opacity-80 mb-2">Hosts:</p>
                <div className="flex flex-wrap gap-3">
                  {activeSpace.hosts.map((host, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white">
                          <img src={host.avatar} alt={host.name} className="rounded-full" />
                        </Avatar>
                        <span className="absolute -bottom-1 -right-1 bg-green-500 p-1 rounded-full">
                          <Mic className="h-3 w-3" />
                        </span>
                      </div>
                      <span className="text-sm mt-1">{host.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm opacity-80 mb-2">Participants:</p>
                <div className="flex flex-wrap gap-2">
                  {activeSpace.participants.slice(0, 6).map((participant, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <img src={participant.avatar} alt={participant.name} className="rounded-full" />
                        </Avatar>
                        <span className="absolute -bottom-1 -right-1 bg-gray-700 p-1 rounded-full">
                          <MicOff className="h-2 w-2" />
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {activeSpace.participantCount > 6 && (
                    <Avatar className="h-10 w-10 border-2 border-white">
                      <span className="text-xs">+{activeSpace.participantCount - 6}</span>
                    </Avatar>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button className="w-full sm:w-auto bg-white text-purple-900 hover:bg-gray-100 flex items-center justify-center">
                <Headphones className="h-5 w-5 mr-2" /> Join Space
              </Button>
              <div className="w-full sm:flex-1">
                <Input 
                  placeholder="Add a comment..." 
                  className="bg-white/20 border-white/30 text-white placeholder-white/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Browse Spaces</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map(space => (
            <SpaceCard key={space.id} {...space} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpacesPage;
