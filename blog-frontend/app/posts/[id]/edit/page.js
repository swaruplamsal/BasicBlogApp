"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../../context/AuthContext";
import { postsApi, categoriesApi, tagsApi } from "../../../../lib/api";

export default function EditPostPage({ params }) {
  const resolvedParams = use(params);

  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // Fetch post, categories, and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, categoriesData, tagsData] = await Promise.all([
          postsApi.getById(resolvedParams.id),
          categoriesApi.getAll(),
          tagsApi.getAll(),
        ]);

        setPost(postData);
        setCategories(categoriesData.results || categoriesData);
        setTags(tagsData.results || tagsData);

        // Set form data
        setFormData({
          title: postData.title,
          content: postData.content,
          category: postData.category?.id || "",
          tags: postData.tags?.map((tag) => tag.id) || [],
        });

        // Set existing image if present
        if (postData.featured_image) {
          setExistingImage(postData.featured_image);
          setImagePreview(postData.featured_image);
        }
      } catch (err) {
        setError("Failed to load post: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  // Check authorization
  useEffect(() => {
    if (!loading && post && user && post.author !== user.id) {
      router.push(`/posts/${resolvedParams.id}`);
    }
  }, [loading, post, user, resolvedParams.id, router]);

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
    setExistingImage(null);
  };

  const handleTagToggle = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Use FormData if there's a new image or if we need to handle file uploads
      let postData;
      if (featuredImage || !existingImage) {
        postData = new FormData();
        postData.append("title", formData.title);
        postData.append("content", formData.content);
        postData.append("category", formData.category);
        formData.tags.forEach((tagId) => {
          postData.append("tags", tagId);
        });
        if (featuredImage) {
          postData.append("featured_image", featuredImage);
        }
      } else {
        postData = formData;
      }

      await postsApi.update(resolvedParams.id, postData);
      router.push(`/posts/${resolvedParams.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await postsApi.delete(resolvedParams.id);
      router.push("/");
    } catch (err) {
      alert("Failed to delete post: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block p-8 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-slate-400">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-3">Error</h2>
            <p className="text-red-300">{error}</p>
          </div>
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
            Edit Post
          </h1>
          <p className="text-xl text-slate-400">Make your changes below</p>
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
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-600"
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
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
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
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-600"
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

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
            >
              {submitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/posts/${resolvedParams.id}`)}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-8 py-4 bg-red-900/30 hover:bg-red-900/50 text-red-400 font-semibold rounded-lg border border-red-900/50 transition-colors"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
