import Link from "next/link";
import Navbar from "./components/Navbar";

export default async function HomePage() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/posts/", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const text = await res.text();
    if (!text) {
      throw new Error("Empty response from API");
    }

    const data = JSON.parse(text);
    const posts = data.results || [];

    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />

        {/* Hero Section - Editorial Style */}
        <div className="relative bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-900/20 via-slate-900/50 to-transparent"></div>
          <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
            <div className="max-w-4xl">
              <p className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-6">
                Editorial Magazine
              </p>
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-slate-50 leading-[1.1]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Stories That
                <br />
                <span className="text-gradient">Matter</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl font-light">
                Discover thoughtful perspectives, compelling narratives, and
                insights that challenge the ordinary.
              </p>
            </div>
          </div>
        </div>

        <div className="py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
            <header className="mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-slate-800 pb-8">
              <div>
                <h2
                  className="text-4xl lg:text-5xl font-bold text-slate-50 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Latest Articles
                </h2>
                <p className="text-slate-500 text-lg">
                  {posts.length} {posts.length === 1 ? "piece" : "pieces"}{" "}
                  published
                </p>
              </div>
              <Link
                href="/posts/create"
                className="group relative px-8 py-4 bg-amber-500 text-slate-950 rounded-md font-semibold hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
              >
                <span className="relative z-10">Write Your Story</span>
              </Link>
            </header>

            <div className="space-y-12">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <article
                    key={post.id}
                    className="card-hover group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 backdrop-blur-sm"
                  >
                    <div className="p-8 lg:p-10">
                      {/* Category Badge */}
                      {post.category_name && (
                        <div className="mb-4">
                          <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase rounded-full border border-amber-500/20">
                            {post.category_name}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h2
                        className="text-3xl lg:text-4xl font-bold text-slate-50 mb-4 leading-tight group-hover:text-amber-500 transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        <Link href={`/posts/${post.id}`} className="block">
                          {post.title}
                        </Link>
                      </h2>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 pb-6 border-b border-slate-800/50">
                        <span className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                            {(post.author_username || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                          <span className="text-slate-300 font-medium">
                            {post.author_username || "Unknown"}
                          </span>
                        </span>
                        <span className="text-slate-700">•</span>
                        <time className="font-light">
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </time>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="px-3 py-1 text-xs font-medium text-slate-400 bg-slate-800/50 rounded-md border border-slate-700/50 hover:border-slate-600 hover:text-slate-300 transition-colors"
                            >
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-5 text-sm text-slate-500">
                          <span className="flex items-center gap-2">
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
                            {post.comment_count}{" "}
                            {post.comment_count === 1 ? "comment" : "comments"}
                          </span>
                        </div>

                        <Link
                          href={`/posts/${post.id}`}
                          className="flex items-center gap-2 text-amber-500 hover:text-amber-400 font-semibold group/link transition-colors"
                        >
                          Read More
                          <svg
                            className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-24">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-8 h-8 text-amber-500"
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
                    <h3 className="text-2xl font-bold text-slate-300 mb-3">
                      No stories yet
                    </h3>
                    <p className="text-slate-500 mb-8">
                      Be the first to share your thoughts and perspectives.
                    </p>
                    <Link
                      href="/posts/create"
                      className="inline-block px-8 py-4 bg-amber-500 text-slate-950 rounded-md font-semibold hover:bg-amber-400 transition-all"
                    >
                      Write First Story
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-3">
              Error Loading Posts
            </h2>
            <p className="text-red-300 mb-6">{error.message}</p>
            <ul className="text-sm text-red-400 space-y-2 list-disc list-inside">
              <li>Make sure Django is running on http://127.0.0.1:8000</li>
              <li>Check that CORS is configured correctly</li>
              <li>Try visiting http://127.0.0.1:8000/api/v1/posts/ directly</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
