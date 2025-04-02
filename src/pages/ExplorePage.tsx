
import React from "react";

const ExplorePage: React.FC = () => {
  // Sample images for the explore grid
  const exploreItems = Array(15).fill(0).map((_, i) => ({
    id: i,
    image: `https://via.placeholder.com/300?text=Post+${i+1}`,
    isVideo: i % 5 === 0, // Every 5th item is a video
  }));
  
  return (
    <div className="py-4">
      <div className="grid grid-cols-3 gap-1 md:gap-2">
        {exploreItems.map((item) => (
          <div 
            key={item.id} 
            className="aspect-square relative overflow-hidden"
          >
            {item.isVideo ? (
              <>
                <video 
                  className="w-full h-full object-cover" 
                  src={item.image} 
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
                src={item.image} 
                alt={`Explore item ${item.id}`} 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
