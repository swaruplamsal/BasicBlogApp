// Helper functions for generating metadata
export function generatePostMetadata(post, request) {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
  const postUrl = `${baseUrl}/posts/${post.slug || post.id}`;
  const imageUrl = post.featured_image_url || `${baseUrl}/images/default-og.jpg`;

  return {
    title: post.title,
    description: post.meta_description || post.excerpt || post.content?.substring(0, 160),
    authors: [{ name: post.author_username }],
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      article: {
        publishedTime: post.published_at || post.created_at,
        modifiedTime: post.updated_at,
        authors: [post.author_username],
        tags: post.tags?.map(tag => tag.name) || [],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description || post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: post.canonical_url || postUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  };
}

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
    apple: "/logo.ico",
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
