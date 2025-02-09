from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserInfoView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView 

# TODO: Set up backend urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', UserInfoView.as_view(), name='user_info'),
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('api/token/blacklist/', TokenBlacklistView.as_view(), name='blacklist_token'),
    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api-auth/', include('rest_framework.urls')),
    # !Include the urls from the api app
    path('api/', include('api.urls')),
]
