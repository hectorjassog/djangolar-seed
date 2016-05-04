from rest_framework import serializers
from .models import Album, Track, GENRE_CHOICES


class TrackSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    duration = serializers.IntegerField(min_value=1)
    order = serializers.IntegerField()
    album = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        """
        Create and returns a new Track
        """
        return Track.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and returns an existing Track
        """
        instance.title =  validated_data.get('title', instance.title)
        instance.duration = validated_data.get('duration', instance.duration)
        instance.order = validated_data.get('order', instance.order)
        instance.save()
        return instance

class AlbumSerializer(serializers.Serializer):
    album_name = serializers.CharField(max_length=100)
    artist = serializers.CharField(max_length=100)
    year = serializers.IntegerField(min_value=-6000, max_value=3000)
    genre = serializers.ChoiceField(GENRE_CHOICES)
    track_set = serializers.StringRelatedField(many=True, read_only=True)

    def create(self, validated_data):
        return Album.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.album_name = validated_data.get('album_name', instance.album_name)
        instance.artist = validated_data.get('artist', instance.artist)
        instance.year = validated_data.get('year', instance.year)
        instance.genre = validated_data.get('genre', instance.genre)
        instance.save()
        return instance
