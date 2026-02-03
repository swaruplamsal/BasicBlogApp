import Link from "next/link";
import Navbar from "../../components/Navbar";
import Avatar from "../../components/Avatar";
import ProfileStats from "../../components/ProfileStats";
import SocialLinks from "../../components/SocialLinks";
import EditProfileButton from "../../components/EditProfileButton";
import { profileApi } from "../../../lib/api";

// Disable caching for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helper function to strip HTML tags for preview
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function ProfilePage({ params }) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  let user = null;
  let posts = [];
  let comments = [];
  let error = null;

  try {
    // Fetch user profile, posts, and comments in parallel
    const [userData, userPosts, userComments] = await Promise.all([
      profileApi.getById(userId),
      profileApi.getUserPosts(userId),
      profileApi.getUserComments(userId),
    ]);
    user = userData;
    posts = userPosts || [];
    comments = userComments || [];
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-3">
              User Not Found
            </h2>
            <p className="text-red-300 mb-6">{error}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const profile = user?.profile || {};
  const avatarUrl = profile.avatar;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Profile Header */}
      <div className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 h-64 bg-gradient-to-br from-red-950/40 via-slate-900 to-blue-950/40" />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-12">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            {/* Avatar */}
            <div className="relative">
              <Avatar
                userId={user.id}
                username={user.username}
                avatarUrl={avatarUrl}
                size="3xl"
                showLink={false}
                className="border-4 border-slate-900 shadow-2xl"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 via-amber-200 to-red-400 bg-clip-text text-transparent">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.username}
                </h1>
                <p className="text-xl text-slate-400 mt-1">@{user.username}</p>
              </div>

              {profile.location && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{profile.location}</span>
                </div>
              )}

              {/* Edit Profile Button (client component - only shows for own profile) */}
              <EditProfileButton profileUserId={user.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Stats & Bio */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 max-w-3xl">
              <h2 className="text-lg font-semibold text-slate-200 mb-6">
                Statistics
              </h2>

              <ProfileStats
                postCount={user.post_count}
                commentCount={user.comment_count}
                memberSince={user.member_since}
              />
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-200 mb-4">
                  About
                </h2>
                <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Social Links */}
            {(profile.website ||
              profile.twitter ||
              profile.github ||
              profile.linkedin) && (
              <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-200 mb-4">
                  Connect
                </h2>
                <SocialLinks
                  website={profile.website}
                  twitter={profile.twitter}
                  github={profile.github}
                  linkedin={profile.linkedin}
                />
              </div>
            )}
          </div>

          {/* Right Content - Posts & Comments */}
          <div className="lg:col-span-2 space-y-8">
            {/* Posts Section */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-200">
                  Posts ({posts.length})
                </h2>
              </div>

              {posts.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No posts yet.</p>
              ) : (
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="block p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-red-600/50 transition-all group"
                    >
                      <h3 className="text-lg font-semibold text-slate-200 group-hover:text-red-400 transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                        {stripHtml(post.content).substring(0, 150)}...
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                        <span>
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span>•</span>
                        <span>{post.comment_count || 0} comments</span>
                      </div>
                    </Link>
                  ))}

                  {posts.length > 5 && (
                    <p className="text-center text-slate-500 text-sm pt-4">
                      And {posts.length - 5} more posts...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Recent Comments Section */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
              <h2 className="text-xl font-semibold text-slate-200 mb-6">
                Recent Activity
              </h2>

              {comments.length === 0 ? (
                <p className="text-slate-400 text-center py-8">
                  No recent comments.
                </p>
              ) : (
                <div className="space-y-4">
                  {comments.slice(0, 5).map((comment) => (
                    <Link
                      key={comment.id}
                      href={`/posts/${comment.post_id}`}
                      className="block p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-red-600/50 transition-all group"
                    >
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>
                          Commented on{" "}
                          <span className="text-slate-300 group-hover:text-red-400 transition-colors">
                            {comment.post_title}
                          </span>
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm line-clamp-2">
                        &ldquo;{comment.content}&rdquo;
                      </p>
                      <span className="text-xs text-slate-600 mt-2 block">
                        {new Date(comment.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
