from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostListView.as_view(), name='post_list'),
    path('posts/<int:post_id>/', views.PostDetailView.as_view(), name='post_detail'),
    path('posts/new/',views.PostCreateView.as_view(),name='post_create'),
    path('posts/<int:post_id>/edit/', views.PostUpdateView.as_view(), name='post_edit'),
    path('posts/<int:post_id>/delete/', views.PostDeleteView.as_view(),name='post_delete'),
    path('posts/<int:post_id>/comment/', views.add_comment, name='add_comment'),
    path('signup/', views.signup, name='signup'),
]