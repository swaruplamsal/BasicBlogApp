export default async function HomePage() {
  // Fetch posts from Django API
  const res = await fetch("http://127.0.0.1:8000/api/v1/posts/", {
    cache: "no-store", // Always get fresh data
  });

  const data = await res.json();
  const posts = data.results; // DRF returns paginated data in 'results'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Blog</h1>
          <p className="text-gray-600 mt-2">Built with Django and Next.js</p>
        </header>

        {/* Posts List */}
        <div className="space-y-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <div className="text-sm text-gray-500 mb-4">
                  By {post.author_username || "Unknown"} •{" "}
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {post.category_name && (
                    <span>
                      {" "}
                      • in <strong>{post.category_name}</strong>
                    </span>
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-gray-600">
                  {post.comment_count}{" "}
                  {post.comment_count === 1 ? "comment" : "comments"}
                </p>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-500">No Posts Yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
