from django.contrib import admin
from .models import Post,Category,Tag,Comment

# Register your models here.

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display=('title','published','created_at','author','category')
    list_filter=('published','created_at','category','tags')
    search_fields=('title','content')
    list_editable=('published',)
    date_hierarchy='created_at'
    filter_horizontal = ('tags',)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('content', 'author__username', 'post__title')