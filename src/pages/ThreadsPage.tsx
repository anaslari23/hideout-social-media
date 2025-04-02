
import React from "react";

const ThreadsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Threads</h1>
      <p className="text-gray-600 dark:text-gray-300">
        This is where users can create tweet-like threads, comment, and reply to each other.
      </p>
    </div>
  );
};

export default ThreadsPage;
