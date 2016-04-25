from rest_framework import serializers
from .models import Album, Track, GENRE_CHOICES


class TrackSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Track

class AlbumSerializer(serializers.ModelSerializer):
    track_set = serializers.StringRelatedField(many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='album-detail', read_only=True)

    class Meta:
        fields = '__all__'
        model = Album
