from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView


@api_view(['GET'])
def api_root(request, format=None):
    """
    Gives links to start navigating the API
    """
    return Response({
        # Just an example
        #'messages': reverse('message-list', request=request, format=format),
    })
