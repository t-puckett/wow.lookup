from django.urls import path
from .views import bnet_login, bnet_callback

urlpatterns = [
    path('auth/bnet/login/', bnet_login, name='bnet-login'),
    path('auth/bnet/callback/', bnet_callback, name='bnet-callback'),
]
