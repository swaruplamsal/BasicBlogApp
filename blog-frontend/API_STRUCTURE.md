# API Response Structure Reference

## Post Object Structure

Based on the Django serializer, the API returns posts with this structure:

```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post content...",
  "author": 1, // ← This is just the USER ID (number), not an object!
  "author_username": "swarup", // ← This is the username (string)
  "category": 1, // ← Category ID
  "category_name": "Technology", // ← Category name
  "tags": [
    {
      "id": 1,
      "name": "django",
      "slug": "django"
    }
  ],
  "created_at": "2026-01-30T10:00:00Z",
  "updated_at": "2026-01-30T10:00:00Z",
  "comment_count": 5
}
```

## Key Points

1. **`author`** - Returns just the user ID (number), NOT an object
2. **`author_username`** - Returns the username as a string
3. To display author name: Use `post.author_username`
4. To check if user owns post: Compare `post.author === user.id`

## Correct Usage in Frontend

✅ **Correct:**

```javascript
{
  post.author_username || "Anonymous";
} // Display name
{
  post.author === user.id;
} // Check ownership
```

❌ **Wrong:**

```javascript
{
  post.author.username;
} // ERROR: author is not an object
{
  post.author?.id === user.id;
} // ERROR: author is already the ID
```
