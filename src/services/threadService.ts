
import { THREAD_ENDPOINTS } from '../config/api.config';
import { getAuthToken } from '../utils/authHelper';

// Types based on your schema
export interface Thread {
  thread_id: number;
  user_id: number;
  content: string;
  media_url?: string;
  parent_thread_id?: number;
  root_thread_id?: number;
  created_at: string;
  likes_count: number;
  replies_count: number;
  user?: {
    username: string;
    profile_picture_url?: string;
  };
}

export interface CreateThreadData {
  content: string;
  media_url?: string;
  parent_thread_id?: number;
  root_thread_id?: number;
}

// Service for thread operations
const ThreadService = {
  // Get threads feed
  getThreads: async (page: number = 1, limit: number = 20): Promise<{ threads: Thread[], totalCount: number }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${THREAD_ENDPOINTS.threads}?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch threads');
      }

      return await response.json();
    } catch (error) {
      console.error('Get threads error:', error);
      throw error;
    }
  },

  // Create a new thread
  createThread: async (threadData: CreateThreadData): Promise<Thread> => {
    try {
      const token = getAuthToken();
      const response = await fetch(THREAD_ENDPOINTS.threads, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(threadData),
      });

      if (!response.ok) {
        throw new Error('Failed to create thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Create thread error:', error);
      throw error;
    }
  },

  // Get a specific thread
  getThread: async (threadId: number): Promise<Thread> => {
    try {
      const token = getAuthToken();
      const response = await fetch(THREAD_ENDPOINTS.thread(threadId), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Get thread error:', error);
      throw error;
    }
  },

  // Reply to a thread
  replyToThread: async (threadId: number, replyData: CreateThreadData): Promise<Thread> => {
    try {
      const token = getAuthToken();
      const response = await fetch(THREAD_ENDPOINTS.threadReply(threadId), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),
      });

      if (!response.ok) {
        throw new Error('Failed to reply to thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Reply to thread error:', error);
      throw error;
    }
  },

  // Get replies for a thread
  getThreadReplies: async (threadId: number, page: number = 1, limit: number = 20): Promise<{ threads: Thread[], totalCount: number }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${THREAD_ENDPOINTS.threadReplies(threadId)}?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch thread replies');
      }

      return await response.json();
    } catch (error) {
      console.error('Get thread replies error:', error);
      throw error;
    }
  },

  // Like a thread
  likeThread: async (threadId: number): Promise<{ success: boolean }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(THREAD_ENDPOINTS.threadLike(threadId), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to like thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Like thread error:', error);
      throw error;
    }
  },

  // Unlike a thread
  unlikeThread: async (threadId: number): Promise<{ success: boolean }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(THREAD_ENDPOINTS.threadLike(threadId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unlike thread');
      }

      return await response.json();
    } catch (error) {
      console.error('Unlike thread error:', error);
      throw error;
    }
  },
};

export default ThreadService;
