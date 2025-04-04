
import { AUTH_ENDPOINTS } from '../config/api.config';

// Types based on your database schema
export interface RegisterUserData {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: {
    user_id: number;
    username: string;
    email: string;
    full_name?: string;
    bio?: string;
    profile_picture_url?: string;
  };
  token: string;
  refreshToken: string;
}

export interface TokenRefreshResponse {
  token: string;
  refreshToken: string;
}

// Service for authentication operations
const AuthService = {
  // Register a new user
  register: async (userData: RegisterUserData): Promise<AuthResponse> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  // Login user
  login: async (loginData: LoginData): Promise<AuthResponse> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<TokenRefreshResponse> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.refreshToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },

  // Request password reset
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.forgotPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Reset password with token
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    try {
      const response = await fetch(AUTH_ENDPOINTS.resetPassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Password reset failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Verify authentication token (for protected routes)
  verifyToken: async (token: string): Promise<boolean> => {
    // This is a mock function - in a real app you might validate the token on the server
    // or decode it client-side to check expiration
    try {
      // JWT validation logic would go here
      return !!token; // Return true if token exists (mock)
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  },
};

export default AuthService;
