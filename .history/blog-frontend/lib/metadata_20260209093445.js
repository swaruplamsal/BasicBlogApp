// Helper functions for generating metadata

export const generateSiteMetadata = () => ({
  title: {
    template: "%s | The Chronicle",
    default: "The Chronicle - Where Stories Matter",
  },
  description:
    "Discover thoughtful perspectives, compelling narratives, and insights that challenge the ordinary.",
  keywords: ["blog", "stories", "articles", "writing", "chronicle"],
  authors: [{ name: "The Chronicle Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Chronicle",
  },
  twitter: {
    card: "summary_large_image",
  },
  // Fallback favicon / site icon. Place a file at public/favicon.png (or /favicon.ico)
  icons: {
    icon: "/logo.ico",
    apple: "./logo.ico",
  },
});

export const generatePostMetadata = (post) => {
  if (!post) return {};

  return {
    title: post.title,
    description: post.content.substring(0, 160) + "...",
    keywords: post.tags?.map((tag) => tag.name) || [],
    authors: [{ name: post.author?.username || "Anonymous" }],
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160) + "...",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author?.username || "Anonymous"],
      tags: post.tags?.map((tag) => tag.name) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.content.substring(0, 160) + "...",
    },
  };
};
