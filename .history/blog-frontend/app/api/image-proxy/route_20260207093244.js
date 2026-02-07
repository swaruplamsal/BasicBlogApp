import { NextResponse } from "next/server";

// Simple proxy to fetch images from a trusted upstream (e.g. your Django API)
// Security: only allow origins that match NEXT_PUBLIC_API_URL to avoid open proxy.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "missing url" }, { status: 400 });
  }

  const allowedBase = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // Validate that the requested image belongs to the allowed origin
  let parsed;
  try {
    parsed = new URL(url);
  } catch (err) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  try {
    const allowedOrigin = new URL(allowedBase).origin;
    if (parsed.origin !== allowedOrigin) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
  } catch (err) {
    // If NEXT_PUBLIC_API_URL is malformed, block for safety
    return NextResponse.json({ error: "server misconfigured" }, { status: 500 });
  }

  // Fetch upstream image and pipe it through
  const res = await fetch(url);
  if (!res.ok) {
    return NextResponse.json({ error: "upstream fetch failed" }, { status: res.status });
  }

  const contentType = res.headers.get("content-type") || "application/octet-stream";
  const arrayBuffer = await res.arrayBuffer();

  return new Response(arrayBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      // Cache images aggressively in the browser when possible
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
