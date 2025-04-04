
import { getAuthToken, getRefreshToken, saveAuthToken, saveRefreshToken } from './authHelper';

interface RequestOptions extends RequestInit {
  authRequired?: boolean;
}

interface ResponseWithData<T> extends Response {
  data?: T;
}

/**
 * API client for making HTTP requests
 */
const apiClient = {
  // Generic request method
  async request<T>(url: string, options: RequestOptions = {}): Promise<T> {
    try {
      // Set default headers
      const headers = new Headers(options.headers);
      
      // Add content-type if not provided
      if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
      }
      
      // Add auth token if required
      if (options.authRequired !== false) {
        const token = getAuthToken();
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      
      // Make the request
      const response: ResponseWithData<T> = await fetch(url, {
        ...options,
        headers,
      });
      
      // Handle unauthorized (token expired)
      if (response.status === 401) {
        // Try to refresh the token
        const refreshed = await this.refreshToken();
        
        if (refreshed) {
          // Retry the request with new token
          return this.request<T>(url, options);
        } else {
          // Redirect to login or handle auth failure
          throw new Error('Authentication failed');
        }
      }
      
      // Parse response
      if (response.ok) {
        if (response.status === 204) {
          // No content
          return {} as T;
        }
        
        // Try to parse JSON, fallback to text
        try {
          response.data = await response.json();
          return response.data as T;
        } catch (e) {
          // Return text response if not JSON
          const text = await response.text();
          return text as unknown as T;
        }
      }
      
      // Handle error responses
      let errorMessage = 'Request failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // Ignore json parsing error
      }
      
      throw new Error(errorMessage);
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },
  
  // Helper for GET requests
  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  },
  
  // Helper for POST requests
  async post<T>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  
  // Helper for PUT requests
  async put<T>(url: string, data?: any, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
  
  // Helper for DELETE requests
  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  },
  
  // Helper for form submissions
  async submitForm<T>(url: string, formData: FormData, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: formData,
    });
  },
  
  // Refresh token method
  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        return false;
      }
      
      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      
      if (response.ok) {
        const data = await response.json();
        saveAuthToken(data.token);
        saveRefreshToken(data.refreshToken);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  },
};

export default apiClient;
