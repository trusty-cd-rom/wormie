from worms.models import Wormhole
from worms.serializers import WormholeSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class WormholeList(APIView):
    """
    List all wormholes, or create a new wormhole
    """
    def get(self, request, format=None):
        wormholes = Wormhole.objects.all()
        serializer = WormholeSerializer(wormholes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WormholeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
