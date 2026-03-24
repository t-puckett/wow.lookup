from django.urls import path
from .views import auth_views, character_views

urlpatterns = [
    path('auth/bnet/login/', auth_views.bnet_login, name='bnet-login'),
    path('auth/bnet/callback/', auth_views.bnet_callback, name='bnet-callback'),
    path('character_summary/',character_views.character_summary,name='character-summary'),
    path('ping/',character_views.ping,name='ping')
]
