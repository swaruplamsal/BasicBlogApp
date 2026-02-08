import Link from "next/link";
import Navbar from "./components/Navbar";
import Avatar from "./components/Avatar";
import Footer from "./components/Footer";
import { postsApi } from "../lib/api";
import SocialLinks from "./components/SocialLinks";

// Helper function to strip HTML tags for preview
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Enable static site generation with revalidation
export const revalidate = 300; // 5 minutes

export default async function HomePage() {
  let posts = [];
  let error = null;

  try {
    const data = await postsApi.getAll();
    posts = data.results || [];
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-3">
              Error Loading Posts
            </h2>
            <p className="text-red-300 mb-6">{error.message}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-red-950/20 via-slate-950 to-blue-950/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center space-y-8">
            <h1 className="text-8xl font-bold bg-linear-to-r from-red-400 via-amber-200 to-red-400 bg-clip-text text-transparent">
              The Chronicle
            </h1>
            <p className="text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Where personal stories, essays, and ideas flourish
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link
                href="/posts/create"
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/50"
              >
                Start Writing
              </Link>
              <Link
                href="#posts"
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Explore Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Posts Grid */}
      <div id="posts" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-slate-100">Latest Stories</h2>
          <div className="h-1 grow ml-8 bg-linear-to-r from-red-600/50 to-transparent rounded"></div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-2xl text-slate-400 mb-4">No stories yet</p>
              <p className="text-slate-500 mb-6">
                Be the first to share your thoughts
              </p>
              <Link
                href="/posts/create"
                className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
              >
                Create First Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group h-full bg-slate-900 rounded-2xl border border-slate-800 hover:border-red-600/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-red-600/10"
              >
                <div className="p-8 space-y-4">
                  {/* Category Badge */}
                  {post.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-red-400 bg-red-950/50 rounded-full border border-red-900/50">
                      {post.category.name}
                    </span>
                  )}

                  {/* Title */}
                  <Link href={`/posts/${post.id}`} className="block">
                    <h3 className="text-2xl font-bold text-slate-100 group-hover:text-red-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <Link
                    href={`/posts/${post.id}`}
                    className="block cursor-pointer"
                  >
                    <p className="text-slate-400 line-clamp-3 leading-relaxed">
                      {stripHtml(post.content).substring(0, 150)}...
                    </p>
                  </Link>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                    <Link
                      href={`/profile/${post.author_id || post.author}`}
                      className="flex items-center gap-2 group/author cursor-pointer"
                    >
                      <Avatar
                        userId={post.author_id || post.author}
                        username={post.author_username}
                        avatarUrl={post.author_avatar}
                        size="sm"
                        showLink={false}
                      />
                      <span className="text-sm text-slate-400 group-hover/author:text-red-400 transition-colors">
                        {post.author_username || "Anonymous"}
                      </span>
                    </Link>
                    <span className="text-slate-600">•</span>
                    <time className="text-sm text-slate-500">
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag.id}
                          className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      
      ;
      <Footer />
    </div>
  );
}
