import Navbar from "../../components/Navbar";
import CommentForm from "../../components/CommentForm";
import CommentList from "../../components/CommentList";
import EditButton from "../../components/EditButton";
import ReadingProgress from "../../components/ReadingProgress";
import Link from "next/link";

export default async function PostPage({ params }) {
  const { id } = await params;

  try {
    const [postRes, commentsRes] = await Promise.all([
      fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/`, {
        cache: "no-store",
      }),
      fetch(`http://127.0.0.1:8000/api/v1/comments/?post=${id}`, {
        cache: "no-store",
      }),
    ]);

    if (!postRes.ok) {
      throw new Error("Post not found");
    }

    const post = await postRes.json();
    const commentsData = commentsRes.ok
      ? await commentsRes.json()
      : { results: [] };
    const comments = commentsData.results || commentsData;

    return (
      <div className="min-h-screen bg-slate-950">
        <ReadingProgress />
        <Navbar />

        <div className="py-12 lg:py-16">
          <article className="max-w-4xl mx-auto px-6 sm:px-8">
            {/* Article Header */}
            <div className="bg-linear-to-b from-slate-900 to-slate-900/50 border border-slate-800 rounded-2xl p-8 lg:p-12 mb-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex-1">
                  {post.category_name && (
                    <div className="mb-6">
                      <span className="inline-block px-4 py-1.5 bg-amber-500/10 text-amber-500 text-xs font-semibold tracking-wider uppercase rounded-full border border-amber-500/20">
                        {post.category_name}
                      </span>
                    </div>
                  )}

                  <h1
                    className="text-4xl lg:text-6xl font-bold text-slate-50 mb-8 leading-[1.15]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-slate-400 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {(post.author_username || "U").charAt(0).toUpperCase()}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-slate-300 font-semibold">
                          {post.author_username || "Unknown"}
                        </span>
                        <time className="text-sm">
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
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <EditButton postId={post.id} authorId={post.author} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="px-3 py-1.5 text-xs font-medium text-slate-400 bg-slate-800/50 rounded-md border border-slate-700/50 hover:border-slate-600 hover:text-slate-300 transition-colors"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 lg:p-12 mb-12">
              <div className="prose prose-lg prose-invert max-w-none">
                {post.content.split("\n").map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-6 text-slate-300 leading-relaxed text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 lg:p-12">
              <h2
                className="text-3xl font-bold text-slate-50 mb-8 pb-4 border-b border-slate-800"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Discussion
                <span className="ml-3 text-lg text-slate-500 font-normal">
                  ({comments.length})
                </span>
              </h2>
              <CommentForm postId={post.id} />
              <CommentList comments={comments} />
            </div>
          </article>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-slate-950 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
            <p className="text-red-300">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }
}
