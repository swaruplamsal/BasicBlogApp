from rest_framework import viewsets, permissions, status
from .models import Post, Comment, Category, Tag, PostImage
from .serializers import PostSerializer, CommentSerializer, CategorySerializer, TagSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response


class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related('author', 'category').prefetch_related('tags')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

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