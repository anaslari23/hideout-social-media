
import { FEED_ENDPOINTS } from '../config/api.config';
import { getAuthToken } from '../utils/authHelper';

// Types based on your schema
export interface Post {
  post_id: number;
  user_id: number;
  content: string;
  media_urls: string[];
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  user?: {
    username: string;
    profile_picture_url?: string;
  };
}

export interface Comment {
  comment_id: number;
  user_id: number;
  content_type: string;
  content_id: number;
  parent_comment_id?: number;
  content: string;
  created_at: string;
  likes_count: number;
  user?: {
    username: string;
    profile_picture_url?: string;
  };
}

export interface CreatePostData {
  content?: string;
  media_urls?: string[];
}

export interface CreateCommentData {
  content: string;
  parent_comment_id?: number;
}

// Service for feed and post operations
const FeedService = {
  // Get feed posts
  getFeed: async (page: number = 1, limit: number = 10): Promise<{ posts: Post[], totalCount: number }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${FEED_ENDPOINTS.feed}?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch feed');
      }

      return await response.json();
    } catch (error) {
      console.error('Get feed error:', error);
      throw error;
    }
  },

  // Create a new post
  createPost: async (postData: CreatePostData): Promise<Post> => {
    try {
      const token = getAuthToken();
      const response = await fetch(FEED_ENDPOINTS.posts, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      return await response.json();
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  },

  // Get a specific post
  getPost: async (postId: number): Promise<Post> => {
    try {
      const token = getAuthToken();
      const response = await fetch(FEED_ENDPOINTS.post(postId), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch post');
      }

      return await response.json();
    } catch (error) {
      console.error('Get post error:', error);
      throw error;
    }
  },

  // Update a post
  updatePost: async (postId: number, postData: CreatePostData): Promise<Post> => {
    try {
      const token = getAuthToken();
      const response = await fetch(FEED_ENDPOINTS.post(postId), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      return await response.json();
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
    }
  },

  // Delete a post
  deletePost: async (postId: number): Promise<{ success: boolean }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(FEED_ENDPOINTS.post(postId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      return await response.json();
    } catch (error) {
      console.error('Delete post error:', error);
      throw error;
    }
  },

  // Like a post
  likePost: async (postId: number): Promise<{ success: boolean }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(FEED_ENDPOINTS.postLike(postId), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to like post');
      }

      return await response.json();
    } catch (error) {
      console.error('Like post error:', error);
      throw error;
    }
  },

  // Unlike a post
  unlikePost: async (postId: number): Promise<{ success: boolean }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(FEED_ENDPOINTS.postLike(postId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unlike post');
      }

      return await response.json();
    } catch (error) {
      console.error('Unlike post error:', error);
      throw error;
    }
  },

  // Get comments for a post
  getPostComments: async (postId: number, page: number = 1, limit: number = 10): Promise<{ comments: Comment[], totalCount: number }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${FEED_ENDPOINTS.postComments(postId)}?page=${page}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      return await response.json();
    } catch (error) {
      console.error('Get comments error:', error);
      throw error;
    }
  },

  // Create a comment on a post
  createPostComment: async (postId: number, commentData: CreateCommentData): Promise<Comment> => {
    try {
      const token = getAuthToken();
      const response = await fetch(FEED_ENDPOINTS.postComments(postId), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      return await response.json();
    } catch (error) {
      console.error('Create comment error:', error);
      throw error;
    }
  },
};

export default FeedService;
