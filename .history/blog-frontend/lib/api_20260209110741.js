const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// Request cache for deduplication
const requestCache = new Map();
const CACHE_DURATION = 60 * 1000; // 1 minute

// Helper function to get auth headers
const getAuthHeaders = () => {
  // Check if we're running on the server or in the browser
  if (typeof window === "undefined") {
    // Server-side: return basic headers without token
    return {
      "Content-Type": "application/json",
    };
  }

  // Client-side: safe to access localStorage
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Token ${token}` }),
  };
};

// Generic API call function with caching
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  // Add caching for GET requests
  if (!options.method || options.method === "GET") {
    const cacheKey = `${url}-${JSON.stringify(config)}`;
    const cached = requestCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail ||
            errorData.error ||
            `API Error: ${response.status}`,
        );
      }

      const data = await response.json();

      // Cache successful responses
      requestCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Non-GET requests (POST, PUT, DELETE) - no caching
  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || errorData.error || `API Error: ${response.status}`,
    );
  }

  // Handle empty responses (like DELETE)
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Posts API
export const postsApi = {
  getAll: (page = 1) => apiCall(`/posts/?page=${page}`),

  getById: (id) => apiCall(`/posts/${id}/`),

  create: (data) => {
    // Check if data is FormData (for file uploads)
    const isFormData = data instanceof FormData;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return fetch(`${API_URL}/posts/`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Token ${token}` }),
        // Don't set Content-Type for FormData - browser sets it with boundary
        ...(!isFormData && { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail ||
            errorData.error ||
            `API Error: ${response.status}`,
        );
      }
      return response.json();
    });
  },

  update: (id, data) => {
    // Check if data is FormData (for file uploads)
    const isFormData = data instanceof FormData;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    return fetch(`${API_URL}/posts/${id}/`, {
      method: "PUT",
      headers: {
        ...(token && { Authorization: `Token ${token}` }),
        // Don't set Content-Type for FormData - browser sets it with boundary
        ...(!isFormData && { "Content-Type": "application/json" }),
      },
      body: isFormData ? data : JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail ||
            errorData.error ||
            `API Error: ${response.status}`,
        );
      }
      return response.json();
    });
  },

  delete: (id) =>
    apiCall(`/posts/${id}/`, {
      method: "DELETE",
    }),
};

// Comments API
export const commentsApi = {
  getByPost: (postId) => apiCall(`/comments/?post=${postId}`),

  create: (data) =>
    apiCall("/comments/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Categories API
export const categoriesApi = {
  getAll: () => apiCall("/categories/"),
};

// Tags API
export const tagsApi = {
  getAll: () => apiCall("/tags/"),

  create: (name) =>
    apiCall("/tags/", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),
};

// Auth API
export const authApi = {
  login: (username, password) =>
    apiCall("/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }),

  signup: (username, email, password) =>
    apiCall("/auth/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    }),

  logout: () =>
    apiCall("/auth/logout/", {
      method: "POST",
    }),

  getCurrentUser: () => apiCall("/profile/"),
};

// Image Upload API
export const imageApi = {
  upload: async (imageFile, postId = null) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const formData = new FormData();
    formData.append("image", imageFile);
    if (postId) {
      formData.append("post_id", postId);
    }

    const response = await fetch(`${API_URL}/upload-image/`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Token ${token}` }),
        // Don't set Content-Type for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to upload image");
    }

    return response.json();
  },
};

// Profile API
export const profileApi = {
  // Get user profile by ID
  getById: (userId) => apiCall(`/users/${userId}/`),

  // Get user profile by username
  getByUsername: (username) => apiCall(`/users/username/${username}/`),

  // Get current user's profile
  getMyProfile: () => apiCall("/profile/"),

  // Update current user's profile
  updateMyProfile: (data) =>
    apiCall("/profile/", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Upload avatar
  uploadAvatar: async (imageFile) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const formData = new FormData();
    formData.append("avatar", imageFile);

    const response = await fetch(`${API_URL}/profile/avatar/`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Token ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to upload avatar");
    }

    return response.json();
  },

  // Delete avatar
  deleteAvatar: () =>
    apiCall("/profile/avatar/delete/", {
      method: "DELETE",
    }),

  // Get user's posts
  getUserPosts: (userId) => apiCall(`/users/${userId}/posts/`),

  // Get user's comments
  getUserComments: (userId) => apiCall(`/users/${userId}/comments/`),
};

export const reactionApi={
  create: (postID,reactionType)=>
}

export default {
  posts: postsApi,
  comments: commentsApi,
  categories: categoriesApi,
  tags: tagsApi,
  auth: authApi,
  profile: profileApi,
};
