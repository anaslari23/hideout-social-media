
import { USER_ENDPOINTS } from '../config/api.config';
import { getAuthToken } from '../utils/authHelper';

// Types based on your user schema
export interface UserProfile {
  user_id: number;
  username: string;
  email: string;
  full_name?: string;
  bio?: string;
  profile_picture_url?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface UserProfileUpdateData {
  full_name?: string;
  bio?: string;
  profile_picture_url?: string;
}

export interface UserStats {
  posts_count: number;
  followers_count: number;
  following_count: number;
}

// User service for profile management
const UserService = {
  // Get current user profile
  getProfile: async (): Promise<UserProfile> => {
    try {
      const token = getAuthToken();
      const response = await fetch(USER_ENDPOINTS.profile, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData: UserProfileUpdateData): Promise<UserProfile> => {
    try {
      const token = getAuthToken();
      const response = await fetch(USER_ENDPOINTS.profile, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Get user by username
  getUserByUsername: async (username: string): Promise<UserProfile> => {
    try {
      const token = getAuthToken();
      const response = await fetch(USER_ENDPOINTS.userByUsername(username), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  // Follow a user
  followUser: async (userId: number): Promise<{ success: boolean }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(USER_ENDPOINTS.follow(userId), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to follow user');
      }

      return await response.json();
    } catch (error) {
      console.error('Follow user error:', error);
      throw error;
    }
  },

  // Unfollow a user
  unfollowUser: async (userId: number): Promise<{ success: boolean }> => {
    try {
      const token = getAuthToken();
      const response = await fetch(USER_ENDPOINTS.unfollow(userId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unfollow user');
      }

      return await response.json();
    } catch (error) {
      console.error('Unfollow user error:', error);
      throw error;
    }
  },

  // Get user followers
  getFollowers: async (): Promise<UserProfile[]> => {
    try {
      const token = getAuthToken();
      const response = await fetch(USER_ENDPOINTS.followers, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch followers');
      }

      return await response.json();
    } catch (error) {
      console.error('Get followers error:', error);
      throw error;
    }
  },

  // Get users that the current user is following
  getFollowing: async (): Promise<UserProfile[]> => {
    try {
      const token = getAuthToken();
      const response = await fetch(USER_ENDPOINTS.following, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch following');
      }

      return await response.json();
    } catch (error) {
      console.error('Get following error:', error);
      throw error;
    }
  },

  // Get user stats (posts count, followers count, following count)
  getUserStats: async (userId: number): Promise<UserStats> => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${USER_ENDPOINTS.userById(userId)}/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user stats error:', error);
      throw error;
    }
  },
};

export default UserService;
