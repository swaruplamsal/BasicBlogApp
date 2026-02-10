// Helper functions for generating metadata
export function generatePostMetadata(post, request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
  const postUrl = `${baseUrl}/posts/${post.slug || post.id}`;
  const imageUrl =
    post.featured_image_url || `${baseUrl}/images/default-og.jpg`;

  // Strip HTML for description fallback
  const stripHtml = (html) =>
    html
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "";
  const description =
    post.meta_description ||
    post.excerpt ||
    stripHtml(post.content)?.substring(0, 160) ||
    `Read more about ${post.title}`;

  return {
    title: post.title,
    description,
    authors: [{ name: post.author_username }],
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description,
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
        tags: post.tags?.map((tag) => tag.name) || [],
      },
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: post.canonical_url || postUrl,
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function generateStructuredData(post) {
  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
  const postUrl = `${baseUrl}/posts/${post.slug || post.id}`;

  const stripHtml = (html) =>
    html
      ?.replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "";
  const description =
    post.meta_description ||
    post.excerpt ||
    stripHtml(post.content)?.substring(0, 160) ||
    `Read more about ${post.title}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description,
    image: post.featured_image_url || `${baseUrl}/images/default-og.jpg`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_username,
      url: `${baseUrl}/profile/${post.author_id}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Your Blog Name",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
    wordCount: post.content ? stripHtml(post.content).split(" ").length : 0,
    ...(post.category_name && { articleSection: post.category_name }),
    ...(post.tags?.length && {
      keywords: post.tags.map((tag) => tag.name).join(", "),
    }),
  };
}

export function generateHomeMetadata() {
  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

  return {
    title: "Home - Your Blog Name",
    description:
      "Discover insightful articles, tutorials, and stories on [your topics].",
    openGraph: {
      type: "website",
      url: baseUrl,
      title: "Your Blog Name",
      description: "Discover insightful articles, tutorials, and stories.",
      images: [
        {
          url: `${baseUrl}/images/og-home.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: baseUrl,
    },
  };
}
