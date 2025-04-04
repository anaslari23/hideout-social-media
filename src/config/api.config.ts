
// API Configuration
export const API_BASE_URL = 'https://api.hideout.app/api'; // Replace with your actual API URL

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  refreshToken: `${API_BASE_URL}/auth/refresh-token`,
  forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
  resetPassword: `${API_BASE_URL}/auth/reset-password`,
};

// User endpoints
export const USER_ENDPOINTS = {
  profile: `${API_BASE_URL}/users/profile`,
  userByUsername: (username: string) => `${API_BASE_URL}/users/${username}`,
  userById: (id: number) => `${API_BASE_URL}/users/${id}`,
  userPosts: (id: number) => `${API_BASE_URL}/users/${id}/posts`,
  userThreads: (id: number) => `${API_BASE_URL}/users/${id}/threads`,
  userFilms: (id: number) => `${API_BASE_URL}/users/${id}/films`,
  follow: (id: number) => `${API_BASE_URL}/users/follow/${id}`,
  unfollow: (id: number) => `${API_BASE_URL}/users/follow/${id}`,
  followers: `${API_BASE_URL}/users/followers`,
  following: `${API_BASE_URL}/users/following`,
};

// Feed endpoints
export const FEED_ENDPOINTS = {
  feed: `${API_BASE_URL}/feed`,
  posts: `${API_BASE_URL}/posts`,
  post: (id: number) => `${API_BASE_URL}/posts/${id}`,
  postLike: (id: number) => `${API_BASE_URL}/posts/${id}/like`,
  postComments: (id: number) => `${API_BASE_URL}/posts/${id}/comments`,
};

// Thread endpoints
export const THREAD_ENDPOINTS = {
  threads: `${API_BASE_URL}/threads`,
  thread: (id: number) => `${API_BASE_URL}/threads/${id}`,
  threadReply: (id: number) => `${API_BASE_URL}/threads/${id}/reply`,
  threadReplies: (id: number) => `${API_BASE_URL}/threads/${id}/replies`,
  threadLike: (id: number) => `${API_BASE_URL}/threads/${id}/like`,
};

// Connect (Messages) endpoints
export const CONNECT_ENDPOINTS = {
  conversations: `${API_BASE_URL}/conversations`,
  conversationMessages: (id: number) => `${API_BASE_URL}/conversations/${id}/messages`,
  messageRead: (id: number) => `${API_BASE_URL}/messages/${id}/read`,
};

// QuickPic endpoints
export const QUICKPIC_ENDPOINTS = {
  quickpics: `${API_BASE_URL}/quickpics`,
  receivedQuickpics: `${API_BASE_URL}/quickpics/received`,
  viewQuickpic: (id: number) => `${API_BASE_URL}/quickpics/${id}/view`,
};

// Films endpoints
export const FILMS_ENDPOINTS = {
  films: `${API_BASE_URL}/films`,
  film: (id: number) => `${API_BASE_URL}/films/${id}`,
  filmLike: (id: number) => `${API_BASE_URL}/films/${id}/like`,
  filmComments: (id: number) => `${API_BASE_URL}/films/${id}/comments`,
};

// Spaces endpoints
export const SPACES_ENDPOINTS = {
  spaces: `${API_BASE_URL}/spaces`,
  space: (id: number) => `${API_BASE_URL}/spaces/${id}`,
  spaceJoin: (id: number) => `${API_BASE_URL}/spaces/${id}/join`,
  spaceLeave: (id: number) => `${API_BASE_URL}/spaces/${id}/leave`,
  spaceMembers: (id: number) => `${API_BASE_URL}/spaces/${id}/members`,
};

// Notifications endpoints
export const NOTIFICATION_ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications`,
  notificationRead: (id: number) => `${API_BASE_URL}/notifications/${id}/read`,
  notificationsReadAll: `${API_BASE_URL}/notifications/read-all`,
};
