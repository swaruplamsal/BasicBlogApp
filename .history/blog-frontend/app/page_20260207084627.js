import Link from "next/link";
import Navbar from "./components/Navbar";
import Avatar from "./components/Avatar";
import { postsApi } from "../lib/api";

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
      <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="border rounded-xl p-8" style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)'
          }}>
            <h2 className="text-2xl font-bold mb-3" style={{color: '#ef4444'}}>
              Error Loading Posts
            </h2>
            <p className="mb-6" style={{color: '#fca5a5'}}>{error.message}</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 text-white font-semibold rounded-lg transition-colors btn-danger"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), var(--background), rgba(20, 184, 166, 0.05))'
        }}></div>
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center space-y-8">
            <h1 className="text-8xl font-bold text-gradient">
              The Chronicle
            </h1>
            <p className="text-2xl max-w-2xl mx-auto leading-relaxed" style={{color: 'var(--foreground-muted)'}}>
              Where stories breathe and ideas flourish
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link
                href="/posts/create"
                className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 btn-primary"
              >
                Start Writing
              </Link>
              <Link
                href="#posts"
                className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 btn-secondary"
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
          <h2 className="text-4xl font-bold" style={{color: 'var(--foreground)'}}>Latest Stories</h2>
          <div className="h-1 grow ml-8 rounded" style={{
            background: 'linear-gradient(to right, var(--accent), transparent)'
          }}></div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-2xl border" style={{
              backgroundColor: 'var(--background-elevated)',
              borderColor: 'var(--border)'
            }}>
              <p className="text-2xl mb-4" style={{color: 'var(--foreground-muted)'}}>No stories yet</p>
              <p className="mb-6" style={{color: 'var(--foreground-subtle)'}}>
                Be the first to share your thoughts
              </p>
              <Link
                href="/posts/create"
                className="inline-block px-6 py-3 text-white font-semibold rounded-lg transition-colors btn-primary"
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
                className="group h-full rounded-2xl border transition-all duration-300 overflow-hidden card-hover" style={{
                  backgroundColor: 'var(--background-elevated)',
                  borderColor: 'var(--border)'
                }}
              >
                <div className="p-8 space-y-4">
                  {/* Category Badge */}
                  {post.category && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full border tag" style={{
                      color: 'var(--accent)',
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      borderColor: 'rgba(16, 185, 129, 0.3)'
                    }}>
                      {post.category.name}
                    </span>
                  )}

                  {/* Title */}
                  <Link href={`/posts/${post.id}`} className="block">
                    <h3 className="text-2xl font-bold transition-colors line-clamp-2 article-title">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  <Link
                    href={`/posts/${post.id}`}
                    className="block cursor-pointer"
                  >
                    <p className="line-clamp-3 leading-relaxed" style={{color: 'var(--foreground-muted)'}}>
                      {stripHtml(post.content).substring(0, 150)}...
                    </p>
                  </Link>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 pt-4 border-t" style={{borderColor: 'var(--border)'}}>
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
                    <span style={{color: 'var(--border-light)'}}>•</span>
                    <time className="text-sm" style={{color: 'var(--foreground-subtle)'}}>
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
                          className="text-xs px-2 py-1 rounded tag"
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
    </div>
  );
}
