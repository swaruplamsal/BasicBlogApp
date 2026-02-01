"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { postsApi, categoriesApi, tagsApi } from "../../../lib/api";

export default function CreatePostPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [addingTag, setAddingTag] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch categories and tags on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, tagsData] = await Promise.all([
          categoriesApi.getAll(),
          tagsApi.getAll(),
        ]);

        setCategories(categoriesData.results || categoriesData);
        setTags(tagsData.results || tagsData);
      } catch (err) {
        console.error("Error fetching categories/tags:", err);
        setError("Failed to load categories and tags");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleAddTag = async (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    setAddingTag(true);
    try {
      const newTag = await tagsApi.create(newTagName.trim());
      setTags((prev) => [...prev, newTag]);
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.id],
      }));
      setNewTagName("");
    } catch (err) {
      alert("Failed to create tag: " + err.message);
    } finally {
      setAddingTag(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use FormData if there's an image, otherwise use JSON
      let postData;
      if (featuredImage) {
        postData = new FormData();
        postData.append("title", formData.title);
        postData.append("content", formData.content);
        postData.append("category", formData.category);
        formData.tags.forEach((tagId) => {
          postData.append("tags", tagId);
        });
        postData.append("featured_image", featuredImage);
      } else {
        postData = formData;
      }

      const post = await postsApi.create(postData);
      router.push(`/posts/${post.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-950 animate-fade-in">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12 space-y-4">
            <div className="h-12 w-96 bg-gradient-to-r from-slate-800/50 via-slate-700/50 to-slate-800/50 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
            <div className="h-6 w-64 bg-gradient-to-r from-slate-800/30 via-slate-700/30 to-slate-800/30 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>
          </div>
          <LoadingSpinner message="Loading form..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 to-amber-400 bg-clip-text text-transparent mb-4">
            Create New Post
          </h1>
          <p className="text-xl text-slate-400">
            Share your thoughts with the world
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Enter an engaging title..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="12"
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent resize-none"
              placeholder="Tell your story..."
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Featured Image (Optional)
            </label>
            <div className="space-y-4">
              {imagePreview ? (
                <div className="relative w-full h-64">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg border border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors z-10"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="featured-image"
                  />
                  <label
                    htmlFor="featured-image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer hover:border-red-600 hover:bg-slate-900/50 transition-all"
                  >
                    <svg
                      className="w-12 h-12 text-slate-500 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-slate-400 mb-1">Click to upload image</p>
                    <p className="text-slate-500 text-sm">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">
              Tags
            </label>

            {/* Add New Tag */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Create new tag..."
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={addingTag || !newTagName.trim()}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                {addingTag ? "Adding..." : "Add Tag"}
              </button>
            </div>

            {/* Tag Selection */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagToggle(tag.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    formData.tags.includes(tag.id)
                      ? "bg-red-600 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/50"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
