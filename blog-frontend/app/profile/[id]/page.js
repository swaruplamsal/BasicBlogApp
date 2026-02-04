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
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar
                userId={user.id}
                username={user.username}
                avatarUrl={avatarUrl}
                size="3xl"
                showLink={false}
                className="border-4 border-slate-700 shadow-xl"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                {user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user.username}
              </h1>
              <p className="text-lg text-slate-400 mb-4">@{user.username}</p>

              {profile.location && (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-400 mb-4">
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

              {/* Quick Stats - Horizontal inline display */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="font-semibold">{user.post_count || 0}</span>
                  <span>Posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="font-semibold">
                    {user.comment_count || 0}
                  </span>
                  <span>Comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="font-semibold">
                    {user.member_since
                      ? new Date(user.member_since).getFullYear()
                      : "N/A"}
                  </span>
                  <span>Joined</span>
                </div>
              </div>

              {/* Bio */}
              {profile.bio && (
                <div className="mt-6 max-w-2xl">
                  <p className="text-slate-300 leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              )}

              {/* Edit Profile Button */}
              <div className="mt-6">
                <EditProfileButton profileUserId={user.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Social Links */}
          <div className="xl:col-span-1">
            {(profile.website ||
              profile.twitter ||
              profile.github ||
              profile.linkedin) && (
              <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
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

          {/* Main Content - Posts & Comments */}
          <div className="xl:col-span-3 space-y-8">
            {/* Posts Section */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                  Recent Posts ({posts.length})
                </h2>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-slate-500 text-lg mb-2">
                    No posts yet
                  </div>
                  <p className="text-slate-600 text-sm">
                    When {user.username} publishes posts, they&apos;ll appear
                    here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.slice(0, 6).map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="group block p-5 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/70 transition-all duration-200"
                    >
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-3 mb-4">
                        {stripHtml(post.content).substring(0, 120)}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </span>
                        <span>{post.comment_count || 0} comments</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {posts.length > 6 && (
                <div className="text-center mt-8">
                  <p className="text-slate-500 text-sm">
                    And {posts.length - 6} more posts...
                  </p>
                </div>
              )}
            </div>

            {/* Recent Comments Section */}
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-800/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                Recent Activity
              </h2>

              {comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-slate-500 text-lg mb-2">
                    No recent comments
                  </div>
                  <p className="text-slate-600 text-sm">
                    Activity will appear here when {user.username} engages with
                    posts.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.slice(0, 5).map((comment) => (
                    <Link
                      key={comment.id}
                      href={`/posts/${comment.post_id}`}
                      className="group block p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/70 hover:bg-slate-800/70 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-1">
                          <svg
                            className="w-4 h-4 text-green-400"
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
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-slate-400 mb-2">
                            Commented on{" "}
                            <span className="text-white group-hover:text-green-400 transition-colors font-medium">
                              {comment.post_title}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm line-clamp-2 mb-2">
                            &ldquo;{comment.content}&rdquo;
                          </p>
                          <span className="text-xs text-slate-600">
                            {new Date(comment.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
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
