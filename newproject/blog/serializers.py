from rest_framework import serializers
from .models import Post, Tag, Category, Comment
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','first_name','last_name']
        read_only_fields=['id']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id','name','slug']
        read_only_fields=['id']

class CategorySerializer(serializers.ModelSerializer):
    post_count=serializers.SerializerMethodField()

    class Meta:
        model=Category
        fields=['id','name','slug','description','post_count']
        read_only_field=['id']

    def get_post_count(self,obj):
        return obj.posts.count()
    
class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_username', 'content', 'created_at']
        read_only_fields = ['id', 'author', 'created_at']

class CommentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating comments"""
    class Meta:
        model = Comment
        fields = ['post', 'content']

class PostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for listing posts"""
    author = UserSerializer(read_only=True)
    author_username = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    comment_count = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'author_username', 'category', 'category_name', 
                  'tags', 'published', 'created_at', 'updated_at', 'comment_count']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']
    
    def get_comment_count(self, obj):
        return obj.comments.count()

class PostDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for retrieving single post"""
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'category', 'tags', 
                  'published', 'created_at', 'updated_at', 'comments', 'comment_count']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']
    
    def get_comment_count(self, obj):
        return obj.comments.count()

class PostCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating posts"""
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        required=False,
        allow_null=True
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        source='tags',
        many=True,
        required=False
    )
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'category_id', 'tag_ids', 'published']
        read_only_fields = ['id']
    
    def create(self, validated_data):
        tags = validated_data.pop('tags', [])
        post = Post.objects.create(**validated_data)
        post.tags.set(tags)
        return post
    
    def update(self, instance, validated_data):
        tags = validated_data.pop('tags', None)
        
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.category = validated_data.get('category', instance.category)
        instance.published = validated_data.get('published', instance.published)
        instance.save()
        
        if tags is not None:
            instance.tags.set(tags)
        
        return instance