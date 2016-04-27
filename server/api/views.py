from django.http import Http404

from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from .models import Album, Track
from .serializers import AlbumSerializer, TrackSerializer, CompleteTrackSerializer, CompleteAlbumSerializer


@api_view(['GET'])
def api_root(request, format=None):
    """
    Gives links to start navigating the API
    """
    return Response({
        # Just an example
        'albums': reverse('album-list', request=request, format=format),
    })

class AlbumList(APIView):
    """
    Lists ALL albums or create a new one
    """

    serializer_class = AlbumSerializer

    def get(self, request, format=None):
        albums = Album.objects.all()
        serializer = AlbumSerializer(albums, many=True, context={'request':request})
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AlbumSerializer(data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AlbumDetail(APIView):
    """
    Retrieve, update or delete a specific album
    """

    serializer_class = CompleteAlbumSerializer

    def get_object(self, pk):
        try:
            return Album.objects.get(pk=pk)
        except Album.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        album = self.get_object(pk)
        serializer = CompleteAlbumSerializer(album, context={'request':request})
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        album = self.get_object(pk)
        serializer = CompleteAlbumSerializer(album, data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        album = self.get_object(pk)
        album.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AlbumTrackListing(APIView):
    """
    List ALL tracks of an album or create a new one
    """

    serializer_class = TrackSerializer

    def get_album(self, pk):
        try:
            return Album.objects.get(pk=pk)
        except Album.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        album = self.get_album(pk=pk)
        tracks = album.tracks.all()
        serializer = TrackSerializer(tracks, many=True, context={'request':request})
        return Response(serializer.data)

    def post(self, request, pk, format=None):
        data = request.data
        data['album'] = pk
        serializer = CompleteTrackSerializer(data=data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TrackDetail(APIView):
    """
    Retrieve, update, or delete a specific track of an album, by order
    """

    serializer_class = TrackSerializer

    def get_object(self,album,order):
        try:
            return Track.objects.get(album=album, order=order)
        except Track.DoesNotExist:
            raise Http404

    def get(self, request, album_id, order, format=None):
        track = self.get_object(album=album_id, order=order)
        serializer = CompleteTrackSerializer(track, context={'request':request})
        return Response(serializer.data)

    def put(self, request, album_id, order, format=None):
        track = self.get_object(album=album_id, order=order)
        serializer = TrackSerializer(track, data=request.data, context={'request':request})
        if serializer.is_valid():
            track = serializer.save()
            return Response(track)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, album_id, order, format=None):
        track = self.get_object(album=album_id, order=order)
        track.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

""" Should not be used, tracks are nested, they doesn't exist without their album
class TrackDetail(APIView):
    \"""
    Retrieve, update, or delete a specific track
    \"""

    serializer_class = CompleteTrackSerializer

    def get_object(self, pk):
        try:
            return Track.objects.get(pk=pk)
        except Track.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        track = self.get_object(pk=pk)
        serializer = CompleteTrackSerializer(track, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        track = self.get_object(pk=pk)
        serializer = CompleteTrackSerializer(track, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        track = self.get_object(pk)
        track.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
"""
