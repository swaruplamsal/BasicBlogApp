import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import CommentList from "../../components/CommentList";
import CommentForm from "../../components/CommentForm";
import EditButton from "../../components/EditButton";
import ReadingProgress from "../../components/ReadingProgress";
import Avatar from "../../components/Avatar";
import { postsApi, commentsApi } from "../../../lib/api";

// Enable static generation and ISR
export const dynamic = "force-static";
export const revalidate = 300; // 5 minutes

export default async function PostDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let post;
  let comments = [];

  // ✅ ONLY data fetching inside try/catch
  try {
    const [postData, commentsData] = await Promise.all([
      postsApi.getById(id),
      commentsApi.getByPost(id),
    ]);

    post = postData;

    comments = Array.isArray(commentsData?.results)
      ? commentsData.results
      : Array.isArray(commentsData)
        ? commentsData
        : [];
  } catch (error) {
    // Let Next.js error boundary handle it
    throw error;
  }

  // Security: if the backend returns an absolute URL that points to the API host
  // (localhost / 127.0.0.1) we proxy it through our own API route so Next.js
  // doesn't block it for resolving to a private IP during SSR.
  const getFeaturedImageSrc = (image) => {
    if (!image) return null;
    try {
      const url = new URL(image);
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const apiOrigin = new URL(apiBase).origin;
      // If the upstream origin matches the API base, proxy it through our API
      if (url.origin === apiOrigin) {
        return `/api/image-proxy?url=${encodeURIComponent(image)}`;
      }
      // Otherwise return the original (external) URL
      return image;
    } catch (e) {
      // If it's a relative path, just return it as is
      return image;
    }
  };

  const featuredImageSrc = getFeaturedImageSrc(post.featured_image);

  return (
    <div className="min-h-screen bg-slate-950">
      <ReadingProgress />
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 py-16">
        {/* ================= Header ================= */}
        <header className="mb-12 space-y-6">
          {/* Category */}
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
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-amber-200 to-red-400 bg-clip-text text-transparent leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-slate-400">
            <Link
              href={`/profile/${post.author_id ?? post.author}`}
              className="flex items-center gap-3 group"
            >
              <Avatar
                userId={post.author_id ?? post.author}
                username={post.author_username}
                avatarUrl={post.author_avatar}
                size="lg"
                showLink={false}
              />
              <div>
                <p className="text-slate-300 font-semibold group-hover:text-red-400 transition-colors">
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
            </Link>

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
          {post.tags?.length > 0 && (
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

        {/* ================= Content ================= */}
        <div
          className="prose prose-invert prose-lg max-w-none mb-12
          [&_p]:text-slate-300
          [&_p]:text-lg
          [&_p]:leading-relaxed
          [&_p]:mb-6
          [&_h2]:text-4xl
          [&_h2]:font-bold
          [&_h2]:bg-gradient-to-r
          [&_h2]:from-red-400
          [&_h2]:to-amber-400
          [&_h2]:bg-clip-text
          [&_h2]:text-transparent
          [&_h2]:mt-12
          [&_h2]:mb-6
          [&_h2]:leading-tight
          [&_strong]:text-slate-100
          [&_em]:italic
          [&_ul]:list-disc
          [&_ul]:ml-6
          [&_li]:text-slate-300
          [&_img]:rounded-xl
          [&_img]:my-8
          [&_img]:border
          [&_img]:border-slate-700/50"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* ================= Edit ================= */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <EditButton
            postId={post.id}
            authorId={post.author_id ?? post.author}
          />
        </div>

        {/* ================= Comments ================= */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-slate-100">
              Comments ({comments.length})
            </h2>
            <div className="h-0.5 flex-grow bg-gradient-to-r from-red-600/50 to-transparent rounded" />
          </div>

          <CommentForm postId={post.id} />
          <CommentList comments={comments} />
        </div>
      </article>
    </div>
  );
}
