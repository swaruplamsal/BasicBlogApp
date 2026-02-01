import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import EditButton from "../../components/EditButton";
import ReadingProgress from "../../components/ReadingProgress";
import { postsApi, commentsApi } from "../../../lib/api";

export default async function PostDetailPage({ params }) {
  // ✅ Await params first (Next.js 15 requirement)
  const resolvedParams = await params;

  try {
    // Fetch post and comments in parallel
    const [post, commentsData] = await Promise.all([
      postsApi.getById(resolvedParams.id),
      commentsApi.getByPost(resolvedParams.id),
    ]);

    const comments = commentsData.results || commentsData;

    return (
      <div className="min-h-screen bg-slate-950">
        <ReadingProgress />
        <Navbar />

        <article className="max-w-4xl mx-auto px-6 py-16">
          {/* Header Section */}
          <header className="mb-12 space-y-6">
            {/* Category Badge */}
            {post.category && (
              <Link
                href="/"
                className="inline-block px-4 py-2 text-sm font-semibold text-red-400 bg-red-950/50 rounded-full border border-red-900/50 hover:bg-red-950 transition-colors"
              >
                {post.category.name}
              </Link>
            )}

            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative w-full h-96 rounded-xl overflow-hidden border border-slate-800">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-amber-200 to-red-400 bg-clip-text text-transparent leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white text-lg font-bold">
                  {post.author_username?.charAt(0).toUpperCase() || "A"}
                </div>
                <div>
                  <p className="text-slate-300 font-semibold">
                    {post.author_username || "Anonymous"}
                  </p>
                  <time className="text-sm text-slate-500">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
              </div>

              {post.updated_at !== post.created_at && (
                <>
                  <span className="text-slate-700">•</span>
                  <span className="text-sm text-slate-500">
                    Updated{" "}
                    {new Date(post.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-sm text-slate-400 bg-slate-800/50 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
              {post.content}
            </div>
          </div>

          {/* Edit Button (Client Component) */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <EditButton postId={post.id} authorId={post.author} />
          </div>

          {/* Comments Section */}
          <div className="mt-16 space-y-8">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-slate-100">
                Comments ({comments.length})
              </h2>
              <div className="h-0.5 flex-grow bg-gradient-to-r from-red-600/50 to-transparent rounded"></div>
            </div>

            {/* Comment Form */}
            <CommentForm postId={post.id} />

            {/* Comments List */}
            <CommentList comments={comments} />
          </div>
        </article>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-3">
              Error Loading Post
            </h2>
            <p className="text-red-300 mb-6">{error.message}</p>
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
}
