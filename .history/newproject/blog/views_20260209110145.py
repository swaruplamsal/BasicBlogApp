from rest_framework import viewsets, permissions, status
from .models import Post, Comment, Category, Tag, PostImage, UserProfile
from .serializers import (
    PostSerializer, CommentSerializer, CategorySerializer, TagSerializer,
    UserDetailSerializer, UserProfileUpdateSerializer
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Permission for profile - only owner can edit"""
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def get_queryset(self):
        """Optimized queryset with proper select_related and prefetch_related"""
        return Post.objects.select_related(
            'author', 
            'author__profile',  # Include profile for avatar
            'category'
        ).prefetch_related(
            'tags'
        ).only(
            'id', 'title', 'content', 'created_at', 'updated_at', 'comment_count', 'featured_image',
            'author__id', 'author__username', 'author__profile__avatar',
            'category__id', 'category__name'
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().select_related('author', 'post')
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    
    def get_queryset(self):
        """Filter comments by post if post parameter is provided"""
        queryset = Comment.objects.all().select_related('author', 'post')
        post_id = self.request.query_params.get('post', None)
        if post_id is not None:
            queryset = queryset.filter(post_id=post_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ReactionViewSet(view)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def upload_post_image(request):
    """Upload an image and return its URL for embedding in post content"""
    if 'image' not in request.FILES:
        return Response(
            {'error': 'No image file provided'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    image_file = request.FILES['image']
    
    # Optional: Create without post initially, or require post_id
    # For now, we'll create a temporary post image
    post_image = PostImage.objects.create(
        post_id=request.data.get('post_id') if request.data.get('post_id') else None,
        image=image_file
    )
    
    # Return the full URL
    image_url = request.build_absolute_uri(post_image.image.url)
    
    return Response({
        'id': post_image.id,
        'url': image_url,
        'uploaded_at': post_image.uploaded_at
    }, status=status.HTTP_201_CREATED)


# ==================== USER PROFILE VIEWS ====================

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_user_profile(request, user_id):
    """Get a user's public profile by their ID"""
    user = get_object_or_404(User, id=user_id)
    serializer = UserDetailSerializer(user, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_user_profile_by_username(request, username):
    """Get a user's public profile by their username"""
    user = get_object_or_404(User, username=username)
    serializer = UserDetailSerializer(user, context={'request': request})
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([permissions.IsAuthenticated])
def my_profile(request):
    """Get or update the current user's profile"""
    user = request.user
    
    # Ensure profile exists
    if not hasattr(user, 'profile'):
        UserProfile.objects.create(user=user)
    
    if request.method == 'GET':
        serializer = UserDetailSerializer(user, context={'request': request})
        return Response(serializer.data)
    
    # PUT or PATCH - Update profile
    serializer = UserProfileUpdateSerializer(
        user.profile, 
        data=request.data, 
        partial=(request.method == 'PATCH'),
        context={'request': request}
    )
    
    if serializer.is_valid():
        serializer.save()
        # Return the full user data after update
        return Response(UserDetailSerializer(user, context={'request': request}).data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def upload_avatar(request):
    """Upload or update avatar for current user"""
    if 'avatar' not in request.FILES:
        return Response(
            {'error': 'No avatar file provided'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = request.user
    
    # Ensure profile exists
    if not hasattr(user, 'profile'):
        UserProfile.objects.create(user=user)
    
    # Delete old avatar if exists
    if user.profile.avatar:
        user.profile.avatar.delete(save=False)
    
    user.profile.avatar = request.FILES['avatar']
    user.profile.save()
    
    avatar_url = request.build_absolute_uri(user.profile.avatar.url)
    
    return Response({
        'avatar': avatar_url,
        'message': 'Avatar updated successfully'
    }, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_avatar(request):
    """Delete avatar for current user"""
    user = request.user
    
    if hasattr(user, 'profile') and user.profile.avatar:
        user.profile.avatar.delete(save=True)
        return Response({'message': 'Avatar deleted successfully'})
    
    return Response({'message': 'No avatar to delete'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_user_posts(request, user_id):
    """Get all posts by a specific user"""
    user = get_object_or_404(User, id=user_id)
    posts = Post.objects.filter(author=user).order_by('-created_at')
    serializer = PostSerializer(posts, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def get_user_comments(request, user_id):
    """Get recent comments by a specific user"""
    user = get_object_or_404(User, id=user_id)
    comments = Comment.objects.filter(author=user).select_related('post').order_by('-created_at')[:20]
    
    # Create a custom response with post title included
    comments_data = []
    for comment in comments:
        comment_serializer = {
            'id': comment.id,
            'content': comment.content,
            'created_at': comment.created_at,
            'post_id': comment.post.id,
            'post_title': comment.post.title,
        }
        comments_data.append(comment_serializer)
    
    return Response(comments_data)