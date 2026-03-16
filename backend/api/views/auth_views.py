from django.http import HttpResponseRedirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import secrets
import urllib.parse
import requests

@api_view(['GET'])
@permission_classes([AllowAny])
def bnet_login(request):
    state = secrets.token_urlsafe(32)
    request.session['oauth_state'] = state

    params = {
        'response_type': 'code',
        'client_id': settings.BNET_CLIENT_ID,
        'redirect_uri': settings.BNET_REDIRECT_URI,
        'scope': 'wow.profile',
        'state': state,
    }

    auth_url = 'https://oauth.battle.net/authorize?' + urllib.parse.urlencode(params)
    return HttpResponseRedirect(auth_url)

@api_view(['GET'])
@permission_classes([AllowAny])
def bnet_callback(request):
    code = request.GET.get('code')
    state = request.GET.get('state')

    if not code or state != request.session.get('oauth_state'):
        return Response({'error': 'Invalid state or missing code'}, status=400)

    token_response = requests.post(
        'https://oauth.battle.net/token',
        data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': settings.BNET_REDIRECT_URI,
        },
        auth=(settings.BNET_CLIENT_ID, settings.BNET_CLIENT_SECRET),
    )

    if token_response.status_code != 200:
        return Response({'error': 'Token exchange failed'}, status=400)

    return Response(token_response.json())