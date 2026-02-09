from rest_framework import serializers
from .models import Post, Comment, Category, Tag, UserProfile, Reaction
from django.contrib.auth.models import User
from django.db.models import Count


class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ["id", "post", "user", "reaction_type", "created_at"]
        read_only_fields = ["user", "created_at"]


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile details"""
    class Meta:
        model = UserProfile
        fields = ['bio', 'avatar', 'location', 'website', 'twitter', 'github', 'linkedin', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']


class UserDetailSerializer(serializers.ModelSerializer):
    """Detailed user serializer with statistics"""
    profile = UserProfileSerializer(read_only=True)
    post_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    member_since = serializers.DateTimeField(source='date_joined', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile', 
                  'post_count', 'comment_count', 'member_since']
        read_only_fields = ['id', 'username', 'date_joined']
    
    def get_post_count(self, obj):
        return obj.post_set.count()
    
    def get_comment_count(self, obj):
        return obj.comment_set.count()


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', required=False)
    first_name = serializers.CharField(source='user.first_name', required=False, allow_blank=True)
    last_name = serializers.CharField(source='user.last_name', required=False, allow_blank=True)
    
    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'first_name', 'last_name', 'bio', 'avatar', 
                  'location', 'website', 'twitter', 'github', 'linkedin']
    
    def update(self, instance, validated_data):
        # Update User model fields
        user_data = validated_data.pop('user', {})
        user = instance.user
        
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()
        
        # Update UserProfile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)
    author_avatar = serializers.SerializerMethodField()
    category_name = serializers.CharField(source='category.name', read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    # Use cached field instead of method
    featured_image=serializers.ImageField(required=False)
    reactions_summary = serializers.SerializerMethodField()
    user_reaction = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'author', 'author_id', 'author_username', 'author_avatar',
            'category', 'category_name', 'tags', 'created_at', 
            'updated_at', 'comment_count', 'featured_image', "reactions_summary', "user_reaction",
        ]
        read_only_fields = ['author', 'created_at', 'updated_at', 'comment_count']

    def get_comment_count(self, obj):
        return obj.comments.count()
    
    def get_author_avatar(self, obj):
        if hasattr(obj.author, 'profile') and obj.author.profile.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.author.profile.avatar.url)
            return obj.author.profile.avatar.url
        return None

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
    
    def get_reactions_summary(self, obj):
        summary = (
            obj.reactions.values("reaction_type")
            .annotate(count=Count("id"))
        )
        return {item["reaction_type"]: item["count"] for item in summary}

    def get_user_reaction(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None
        reaction = obj.reactions.filter(user=request.user).first()
        if not reaction:
            return None
        return {"id": reaction.id, "reaction_type": reaction.reaction_type}


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    author_id = serializers.IntegerField(source='author.id', read_only=True)
    author_avatar = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'post', 'content', 'author', 'author_id', 'author_username', 'author_avatar', 'created_at']
        read_only_fields = ['author', 'created_at']
    
    def get_author_avatar(self, obj):
        if hasattr(obj.author, 'profile') and obj.author.profile.avatar:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.author.profile.avatar.url)
            return obj.author.profile.avatar.url
        return None

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)