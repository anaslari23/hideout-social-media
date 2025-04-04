
// Token storage keys
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

// Save auth token to localStorage
export const saveAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Save refresh token to localStorage
export const saveRefreshToken = (refreshToken: string): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

// Get refresh token from localStorage
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Remove refresh token from localStorage
export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Save user data to localStorage
export const saveUserData = (userData: any): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
};

// Get user data from localStorage
export const getUserData = (): any | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Remove user data from localStorage
export const removeUserData = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};

// Clear all auth related data
export const clearAuthData = (): void => {
  removeAuthToken();
  removeRefreshToken();
  removeUserData();
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};
