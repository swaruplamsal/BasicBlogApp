const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

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

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

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
  getAll: () => apiCall("/posts/"),

  getById: (id) => apiCall(`/posts/${id}/`),

  create: (data) =>
    apiCall("/posts/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiCall(`/posts/${id}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

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

  getCurrentUser: () => apiCall("/auth/user/"),
};

export default {
  posts: postsApi,
  comments: commentsApi,
  categories: categoriesApi,
  tags: tagsApi,
  auth: authApi,
};
