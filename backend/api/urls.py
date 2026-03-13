from django.urls import path
from .views import auth_views, charcter_views, guild_views

urlpatterns = [
    path('auth/bnet/login/', auth_views.bnet_login, name='bnet-login'),
    path('auth/bnet/callback/', auth_views.bnet_callback, name='bnet-callback'),
    path('api/character_summary/',charcter_views.character_summary,name='character-summary')
]
