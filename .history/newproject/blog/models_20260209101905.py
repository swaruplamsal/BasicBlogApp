from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    """Extended user profile with additional information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    website = models.URLField(max_length=200, blank=True)
    twitter = models.CharField(max_length=50, blank=True)
    github = models.CharField(max_length=50, blank=True)
    linkedin = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"


# Signal to automatically create a profile when a new user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    # Create profile if it doesn't exist (for existing users)
    if not hasattr(instance, 'profile'):
        UserProfile.objects.create(user=instance)
    instance.profile.save()


class Tag(models.Model):
    name=models.CharField(max_length=50, unique=True)
    slug=models.SlugField(max_length=50, unique=True)

    def __str__(self):  
        return self.name

class Category(models.Model):
    name=models.CharField(max_length=100, unique=True)
    slug=models.SlugField(max_length=100, unique=True)
    description=models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=200, db_index=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False, db_index=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    category= models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name="posts")
    tags=models.ManyToManyField(Tag, blank=True, related_name="posts")
    featured_image=models.ImageField(upload_to='posts_images',null=True,blank=True)
    
    # Cached fields to avoid N+1 queries
    comment_count = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['author', '-created_at']),
            models.Index(fields=['category', '-created_at']),
            models.Index(fields=['published', '-created_at']),
        ]

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    post= models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author=models.ForeignKey(User, on_delete=models.CASCADE)
    content=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at'] # Newest comments first
        indexes = [
            models.Index(fields=['post', '-created_at']),
            models.Index(fields=['author', '-created_at']),
        ]
    
    def __str__(self):
        return f'Comment by {self.author.username} on {self.post.title}'
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            # Update post comment count
            Post.objects.filter(pk=self.post_id).update(
                comment_count=models.F('comment_count') + 1
            )
    
    def delete(self, *args, **kwargs):
        post_id = self.post_id
        super().delete(*args, **kwargs)
        # Update post comment count
        Post.objects.filter(pk=post_id).update(
            comment_count=models.F('comment_count') - 1
        )
    
class PostImage(models.Model):
    post=models.ForeignKey(Post, on_delete=models.CASCADE,related_name='images', null=True, blank=True)
    image=models.ImageField(upload_to='post_content_images/')
    uploaded_at=models.DateTimeField(auto_now_add=True)
    order=models.IntegerField(default=0) #For ordering if needed

    class Meta:
        ordering=['order','uploaded_at']

    def __str__(self):
        return f'Image for {self.post.title if self.post else "Unattached"}'

class Reaction (models.Model):
    REACTION_CHOICES=[
        ("like","Like"),
        ("love","Love"),
        ("clap","Clap"),
        ("insightful","Insightful")
    ]