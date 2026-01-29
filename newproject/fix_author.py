import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'newproject.settings')
django.setup()

from blog.models import Post
from django.contrib.auth.models import User

# Get the first user or create a default one
user = User.objects.first()

if not user:
    user = User.objects.create_user(
        username='admin',
        email='admin@example.com',
        password='admin123'
    )
    print(f"Created new user: {user.username}")
else:
    print(f"Using existing user: {user.username}")

# Update all posts without an author
posts_without_author = Post.objects.filter(author__isnull=True)
count = posts_without_author.count()

if count > 0:
    posts_without_author.update(author=user)
    print(f"✓ Updated {count} posts with author: {user.username}")
else:
    print("✓ All posts already have authors")

# Show all posts with their authors
print("\nCurrent posts:")
for post in Post.objects.all():
    print(f"  - '{post.title}' by {post.author.username if post.author else 'None'}")