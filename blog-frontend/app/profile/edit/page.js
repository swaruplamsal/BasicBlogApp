"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Avatar from "../../components/Avatar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import { profileApi } from "../../../lib/api";

export default function EditProfilePage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch current profile data
    const fetchProfile = async () => {
      try {
        const data = await profileApi.getMyProfile();
        setProfile(data);
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          bio: data.profile?.bio || "",
          location: data.profile?.location || "",
          website: data.profile?.website || "",
          twitter: data.profile?.twitter || "",
          github: data.profile?.github || "",
          linkedin: data.profile?.linkedin || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedProfile = await profileApi.updateMyProfile(formData);
      setProfile(updatedProfile);
      setSuccess("Profile updated successfully!");

      // Update local storage user data
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userData,
            email: formData.email,
          }),
        );
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setUploadingAvatar(true);
    setError(null);

    try {
      const result = await profileApi.uploadAvatar(file);
      setProfile((prev) => ({
        ...prev,
        profile: { ...prev.profile, avatar: result.avatar },
      }));
      setSuccess("Avatar updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleDeleteAvatar = async () => {
    if (!confirm("Are you sure you want to remove your avatar?")) return;

    setUploadingAvatar(true);
    setError(null);

    try {
      await profileApi.deleteAvatar();
      setProfile((prev) => ({
        ...prev,
        profile: { ...prev.profile, avatar: null },
      }));
      setSuccess("Avatar removed successfully!");
    } catch (err) {
      setError(err.message || "Failed to remove avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-200 mb-4">
            Please log in to edit your profile
          </h2>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/profile/${user.id}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Profile
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-amber-200 to-red-400 bg-clip-text text-transparent">
            Edit Profile
          </h1>
          <p className="text-slate-400 mt-2">
            Update your profile information and social links
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
            {success}
          </div>
        )}

        {/* Avatar Section */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-200 mb-4">
            Profile Picture
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar
                userId={user.id}
                username={profile?.username}
                avatarUrl={profile?.profile?.avatar}
                size="2xl"
                showLink={false}
              />
              {uploadingAvatar && (
                <div className="absolute inset-0 bg-slate-900/80 rounded-full flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                </div>
              )}
            </div>
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <button
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="block px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Upload New Photo
              </button>
              {profile?.profile?.avatar && (
                <button
                  onClick={handleDeleteAvatar}
                  disabled={uploadingAvatar}
                  className="block px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  Remove Photo
                </button>
              )}
              <p className="text-xs text-slate-500">
                JPG, PNG or GIF. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  placeholder="Doe"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors resize-none"
                  placeholder="Tell us about yourself..."
                />
                <p className="text-xs text-slate-500 mt-1 text-right">
                  {formData.bio.length}/500
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-200 mb-4">
              Social Links
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Twitter Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                    placeholder="username"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  GitHub Username
                </label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  placeholder="username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-colors"
                  placeholder="username or custom-url"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href={`/profile/${user.id}`}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <LoadingSpinner size="sm" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
