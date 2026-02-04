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
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
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
      <div className="relative overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-slate-900 to-amber-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
            {/* Avatar with subtle red styling */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-full blur-sm opacity-60"></div>
              <Avatar
                userId={user.id}
                username={user.username}
                avatarUrl={avatarUrl}
                size="3xl"
                showLink={false}
                className="relative border-3 border-slate-700/60 shadow-xl"
              />
            </div>

            {/* User Info with enhanced typography */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-3">
                {user.first_name && user.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user.username}
              </h1>
              <p className="text-xl text-slate-400 mb-6">@{user.username}</p>

              {profile.location && (
                <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-300 mb-6">
                  <svg
                    className="w-5 h-5 text-red-400"
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

              {/* Enhanced Quick Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-8">
                <div className="flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/50"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {user.post_count || 0}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">
                      Posts
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/50"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {user.comment_count || 0}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">
                      Comments
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-800/30 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50">
                  <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow-lg shadow-rose-500/50"></div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">
                      {user.member_since
                        ? new Date(user.member_since).getFullYear()
                        : "N/A"}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">
                      Joined
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio with enhanced styling */}
              {profile.bio && (
                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 mb-6 max-w-2xl mx-auto lg:mx-0">
                  <p className="text-slate-200 leading-relaxed text-lg italic">
                    &ldquo;{profile.bio}&rdquo;
                  </p>
                </div>
              )}

              {/* Edit Profile Button */}
              <div>
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
          <div className="xl:col-span-1 space-y-6">
            {(profile.website ||
              profile.twitter ||
              profile.github ||
              profile.linkedin) && (
              <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-red-900/20 p-6 shadow-2xl">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-amber-500 rounded-full shadow-lg"></div>
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
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-red-900/20 p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-amber-500 rounded-full shadow-lg"></div>
                  Recent Posts
                  <span className="text-lg text-slate-400 font-normal">
                    ({posts.length})
                  </span>
                </h2>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-slate-500">
                    When {user.username} publishes posts, they&apos;ll appear
                    here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {posts.slice(0, 6).map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/30 hover:border-red-500/50 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/10 cursor-pointer"
                    >
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>

                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {stripHtml(post.content).substring(0, 120)}...
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <span className="text-red-400 font-medium">
                          {post.comment_count || 0} comments
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {posts.length > 6 && (
                <div className="text-center mt-10">
                  <div className="inline-flex items-center gap-2 text-slate-400 bg-slate-800/30 px-6 py-3 rounded-full border border-slate-700/30 cursor-pointer hover:text-slate-300 transition-colors">
                    <span>And {posts.length - 6} more posts</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Comments Section */}
            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-xl rounded-2xl border border-red-900/20 p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-red-500 rounded-full shadow-lg"></div>
                Recent Activity
              </h2>

              {comments.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-amber-400"
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
                  <h3 className="text-xl font-semibold text-slate-300 mb-2">
                    No recent comments
                  </h3>
                  <p className="text-slate-500">
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
                      className="group block p-6 rounded-xl bg-gradient-to-r from-slate-800/40 to-slate-900/40 border border-slate-700/30 hover:border-amber-500/50 hover:bg-slate-800/60 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500/20 to-red-500/20 rounded-lg flex items-center justify-center border border-amber-500/20">
                          <svg
                            className="w-5 h-5 text-amber-400"
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
                          <div className="text-sm text-slate-400 mb-3">
                            Commented on{" "}
                            <span className="text-white group-hover:text-amber-400 transition-colors font-semibold">
                              {comment.post_title}
                            </span>
                          </div>
                          <blockquote className="text-slate-200 italic border-l-2 border-red-500/30 pl-4 mb-3">
                            &ldquo;{comment.content}&rdquo;
                          </blockquote>
                          <div className="text-xs text-slate-500 bg-slate-800/30 inline-block px-3 py-1 rounded-full">
                            {new Date(comment.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
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
