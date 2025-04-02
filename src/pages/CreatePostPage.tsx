
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, ImagePlus, X, Video } from "lucide-react";

const CreatePostPage: React.FC = () => {
  const [caption, setCaption] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const isVideoFile = file.type.startsWith('video/');
    setIsVideo(isVideoFile);
    
    const reader = new FileReader();
    reader.onload = () => {
      setMediaPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const clearMedia = () => {
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, here we would upload the media and create the post
    console.log("Creating post with:", { caption, mediaPreview, isVideo });
    
    // Reset the form
    setCaption("");
    setMediaPreview(null);
    
    // Redirect to feed after post creation
    window.location.href = "/feed";
  };
  
  return (
    <div className="max-w-lg mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Media preview/upload section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {mediaPreview ? (
            <div className="relative aspect-square">
              {isVideo ? (
                <video 
                  src={mediaPreview} 
                  className="w-full h-full object-contain" 
                  controls
                />
              ) : (
                <img 
                  src={mediaPreview} 
                  alt="Media preview" 
                  className="w-full h-full object-contain" 
                />
              )}
              
              <button 
                type="button"
                onClick={clearMedia}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 rounded-full p-1 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div 
              className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Image className="h-8 w-8 text-gray-400" />
                <Video className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Click to upload a photo or video
              </p>
              <input 
                type="file" 
                accept="image/*,video/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </div>
          )}
        </div>
        
        {/* Caption input */}
        <Textarea
          placeholder="Write a caption..."
          className="min-h-[100px] resize-none"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        
        {/* Submit button */}
        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={!mediaPreview && !caption.trim()}
        >
          Share
        </Button>
      </form>
    </div>
  );
};

export default CreatePostPage;
