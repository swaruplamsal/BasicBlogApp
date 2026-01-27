from .models import Post, Comment, Category, Tag
from .forms import PostForm, CommentForm
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth import login
from django.shortcuts import render,redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets,permissions,filters,status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    PostCreateUpdateSerializer,
    CommentSerializer,
    CommentCreateSerializer,
    CategorySerializer,
    TagSerializer
)
# Create your views here.

# FBV
# def post_detail(request, post_id):
#     post=get_object_or_404(Post, id=post_id)
#     return render(request, 'blog/post_details.html', {'post': post})

#CBV
class PostDetailView(DetailView):
    model=Post
    template_name='blog/post_details.html'
    context_object_name='post'
    pk_url_kwarg='post_id'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['comment_form'] = CommentForm()
        return context

@login_required
def add_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.save()
            return redirect('post_detail', post_id=post.id)
    
    return redirect('post_detail', post_id=post.id)

# FBV
# def post_list(request):
#     posts = Post.objects.filter(published=True).order_by('-created_at')
#     return render(request, 'blog/post_list.html', {'posts': posts})

# CBV
class PostListView(ListView):
    model=Post
    template_name='blog/post_list.html'
    context_object_name='posts'
    paginate_by=10 #Ten posts per page(Optional)

    def get_queryset(self):
        return Post.objects.filter(published=True).order_by('-created_at') 

# FBV
# def post_create(request):
#     if request.method=='POST':
#         form=PostForm(request.POST)
#         if form.is_valid():
#             post=form.save()
#             return redirect('post_detail',post_id=post.id)
#     else:
#         form=PostForm()

#         return render(request, 'blog/post_form.html',{'form':form})

#CBV
class PostCreateView(CreateView):
    model=Post
    form_class=PostForm
    template_name='blog/post_form.html'

    def form_valid(self, form):
        form.instance.author = self.request.user  # Add this line
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('post_detail',kwargs={'post_id':self.object.id})

# FBV    
# def post_edit(request,post_id):
#     post=get_object_or_404(Post,id=post_id)

#     if request.method=='POST':
#         form=PostForm(request.POST,instance=post)
#         if form.is_valid():
#             form.save()
#             return redirect('post_detail',post_id=post.id)
#     else:
#         form=PostForm(instance=post)
#     return render(request,'blog/post_form.html',{'form':form, 'post':post})

#CBV
class PostUpdateView(UpdateView):
    model=Post
    form_class=PostForm
    template_name='blog/post_form.html'
    pk_url_kwarg='post_id'

    def get_success_url(self):
        return reverse_lazy('post_detail',kwargs={'post_id':self.object.id})
    
class PostDeleteView(DeleteView):
    model=Post
    success_url=reverse_lazy('post_list')
    pk_url_kwarg='post_id'
    template_name='blog/post_confirm_delete.html'

def signup(request):
    if request.method=='POST':
        form=UserCreationForm(request.POST)
        if form.is_valid():
            user=form.save()
            login(request,user)
            return redirect('post_list')
    else:
        form=UserCreationForm()

    return render(request, 'registration/signup.html',{'form':form})

# Custom Permission
class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors to edit their posts
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the author
        return obj.author == request.user


# API ViewSets
class PostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Post model
    Provides list, create, retrieve, update, destroy actions
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'updated_at', 'title']
    ordering = ['-created_at']
    
    def get_queryset(self):
        queryset = Post.objects.all()
        
        # Show only published posts to non-authenticated users
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(published=True)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filter by tag
        tag = self.request.query_params.get('tag')
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        
        # Filter by author
        author = self.request.query_params.get('author')
        if author:
            queryset = queryset.filter(author__username=author)
        
        return queryset.select_related('author', 'category').prefetch_related('tags', 'comments')
    
    def get_serializer_class(self):
        if self.action == 'list':
            return PostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PostCreateUpdateSerializer
        return PostDetailSerializer
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def publish(self, request, pk=None):
        """Custom action to publish a post"""
        post = self.get_object()
        if post.author != request.user:
            return Response(
                {'error': 'You can only publish your own posts'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        post.published = True
        post.save()
        return Response({'status': 'post published'})
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def unpublish(self, request, pk=None):
        """Custom action to unpublish a post"""
        post = self.get_object()
        if post.author != request.user:
            return Response(
                {'error': 'You can only unpublish your own posts'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        post.published = False
        post.save()
        return Response({'status': 'post unpublished'})


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Comment model
    """
    queryset = Comment.objects.all().select_related('author', 'post')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return CommentCreateSerializer
        return CommentSerializer
    
    def get_queryset(self):
        queryset = Comment.objects.all()
        
        # Filter by post
        post_id = self.request.query_params.get('post')
        if post_id:
            queryset = queryset.filter(post_id=post_id)
        
        return queryset.select_related('author', 'post')
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Category model (read-only)
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Tag model (read-only)
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    lookup_field = 'slug'