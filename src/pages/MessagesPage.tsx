
import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isMe: boolean;
  timestamp: string;
}

interface Conversation {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

const SAMPLE_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    user: {
      username: "user1",
      avatar: "https://via.placeholder.com/40",
    },
    lastMessage: "Hey, how's it going?",
    lastMessageTime: "10m",
    unread: 0,
    messages: [
      { id: 1, text: "Hi there!", isMe: false, timestamp: "Yesterday, 2:30 PM" },
      { id: 2, text: "Hello! How are you?", isMe: true, timestamp: "Yesterday, 2:35 PM" },
      { id: 3, text: "I'm good, thanks! How about you?", isMe: false, timestamp: "Yesterday, 2:40 PM" },
      { id: 4, text: "I'm doing great! Just working on some new photos.", isMe: true, timestamp: "Yesterday, 3:00 PM" },
      { id: 5, text: "That sounds awesome! Can't wait to see them.", isMe: false, timestamp: "Yesterday, 3:05 PM" },
      { id: 6, text: "Hey, how's it going?", isMe: false, timestamp: "10 minutes ago" },
    ],
  },
  {
    id: 2,
    user: {
      username: "traveler",
      avatar: "https://via.placeholder.com/40",
    },
    lastMessage: "Where was that photo taken?",
    lastMessageTime: "2h",
    unread: 3,
    messages: [
      { id: 1, text: "I loved your latest post!", isMe: false, timestamp: "Yesterday, 11:30 AM" },
      { id: 2, text: "Thank you! I took that in Paris.", isMe: true, timestamp: "Yesterday, 12:35 PM" },
      { id: 3, text: "Where was that photo taken?", isMe: false, timestamp: "2 hours ago" },
    ],
  },
  {
    id: 3,
    user: {
      username: "therock",
      avatar: "https://via.placeholder.com/40",
    },
    lastMessage: "Keep up the good work!",
    lastMessageTime: "1d",
    unread: 0,
    messages: [
      { id: 1, text: "Your workout routine is inspiring!", isMe: false, timestamp: "Monday, 9:30 AM" },
      { id: 2, text: "Thanks! I appreciate that.", isMe: true, timestamp: "Monday, 10:15 AM" },
      { id: 3, text: "Keep up the good work!", isMe: false, timestamp: "Yesterday, 8:20 PM" },
    ],
  },
];

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, we would send this message to the server
    console.log("Sending message:", newMessage);
    
    // For demo purposes, we'll just add it to the conversation locally
    const newMessageObj: Message = {
      id: Date.now(),
      text: newMessage,
      isMe: true,
      timestamp: "Just now",
    };
    
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessageObj],
      lastMessage: newMessage,
      lastMessageTime: "Just now",
    });
    
    setNewMessage("");
  };
  
  return (
    <div className="flex h-[80vh] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Conversations list */}
      <div className="w-full sm:w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold dark:text-white">Messages</h1>
        </div>
        
        <div className="overflow-y-auto h-[calc(80vh-61px)]">
          {SAMPLE_CONVERSATIONS.map((conversation) => (
            <div 
              key={conversation.id}
              className={`flex items-center p-4 cursor-pointer ${
                selectedConversation?.id === conversation.id 
                  ? "bg-gray-100 dark:bg-gray-700" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 mr-3">
                  <img 
                    src={conversation.user.avatar} 
                    alt={conversation.user.username}
                    className="object-cover w-full h-full"
                  />
                </Avatar>
                {conversation.unread > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate dark:text-white">
                    {conversation.user.username}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {conversation.lastMessageTime}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Conversation detail */}
      <div className="hidden sm:flex flex-col w-2/3 bg-gray-50 dark:bg-gray-900">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <img 
                    src={selectedConversation.user.avatar} 
                    alt={selectedConversation.user.username}
                    className="object-cover w-full h-full"
                  />
                </Avatar>
                <h2 className="font-semibold dark:text-white">
                  {selectedConversation.user.username}
                </h2>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] rounded-2xl p-3 ${
                    message.isMe 
                      ? "bg-purple-600 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  }`}>
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isMe 
                        ? "text-purple-200" 
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <form 
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex"
            >
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 mr-2"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-xl font-semibold dark:text-white">No conversation selected</p>
              <p className="text-gray-500 dark:text-gray-400">Choose a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
