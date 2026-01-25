
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('',include('blog.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
]

# What `django.contrib.auth.urls` gives you:
# - `/accounts/login/` - login page
# - `/accounts/logout/` - logout
# - `/accounts/password_change/` - change password
# - `/accounts/password_reset/` - reset password
# - And more!