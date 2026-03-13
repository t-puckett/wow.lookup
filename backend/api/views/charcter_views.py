from django.http import HttpResponseRedirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import secrets
import urllib.parse
import requests

#temp till i get all the info we need sent to this.
@api_view(['GET'])
@permission_classes([AllowAny])
def character_summary(request):
    code = request.GET.get('code')

    params = {
        'info' : 'temp'
    }
    return Response({'code': code, 'params': params})