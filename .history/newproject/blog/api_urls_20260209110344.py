from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet, CommentViewSet, CategoryViewSet, TagViewSet, upload_post_image,
    get_user_profile, get_user_profile_by_username, my_profile, 
    upload_avatar, delete_avatar, get_user_posts, get_user_comments
)
from .auth_views import login_view,signup_view,logout_view,current_user_view

router = DefaultRouter()
router.register(r'posts',PostViewSet,basename='post')
router.register(r'comments',CommentViewSet,basename='comment')
router.register(r'categories',CategoryViewSet,basename='category')
router.register(r'tags',TagViewSet,basename='tag')
router.register(r'reactions',ReactionViewSet,basename=)

urlpatterns=[
    path('',include(router.urls)),
    # Authenication Endpoints
    path('auth/login/',login_view,name='api_login'),
    path('auth/signup/', signup_view, name='api_signup'),
    path('auth/logout/', logout_view, name='api_logout'),
    path('auth/user/', current_user_view, name='api_current_user'),
    path('upload-image/',upload_post_image,name='upload_post_image'),
    
    # Profile Endpoints
    path('profile/', my_profile, name='my_profile'),
    path('profile/avatar/', upload_avatar, name='upload_avatar'),
    path('profile/avatar/delete/', delete_avatar, name='delete_avatar'),
    path('users/<int:user_id>/', get_user_profile, name='user_profile'),
    path('users/<int:user_id>/posts/', get_user_posts, name='user_posts'),
    path('users/<int:user_id>/comments/', get_user_comments, name='user_comments'),
    path('users/username/<str:username>/', get_user_profile_by_username, name='user_profile_by_username'),
]