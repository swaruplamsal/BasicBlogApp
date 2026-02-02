from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet, CategoryViewSet, TagViewSet, upload_post_image
from .auth_views import login_view,signup_view,logout_view,current_user_view

router = DefaultRouter()
router.register(r'posts',PostViewSet,basename='post')
router.register(r'comments',CommentViewSet,basename='comment')
router.register(r'categories',CategoryViewSet,basename='category')
router.register(r'tags',TagViewSet,basename='tag')

urlpatterns=[
    path('',include(router.urls)),
    # Authenication Endpoints
    path('auth/login/',login_view,name='api_login'),
    path('auth/signup/', signup_view, name='api_signup'),
    path('auth/logout/', logout_view, name='api_logout'),
    path('auth/user/', current_user_view, name='api_current_user'),
    path('upload-image/',upload_post_image,name='upload_post_image'),
]