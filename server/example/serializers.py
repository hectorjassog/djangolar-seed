from rest_framework import serializers

from .models import Album, Track, UserProfile
from .serializer_fields import ParameterisedHyperlinkedIdentityField

from django.contrib.auth.models import User


class CompleteTrackSerializer(serializers.ModelSerializer):
    url = ParameterisedHyperlinkedIdentityField(
            lookup_fields=(('album.id','album_id'),('order','order'),),
            view_name='album-track-detail',
            read_only=True)

    class Meta:
        fields = '__all__'
        model = Track
        read_only_fields = ('plays')

class TrackSerializer(serializers.ModelSerializer):

    url = ParameterisedHyperlinkedIdentityField(
            lookup_fields=(('album.id','album_id'),('order','order'),),
            view_name='album-track-detail',
            read_only=True)

    class Meta:
        fields = ('order', 'title', 'duration', 'url', 'id', 'plays')
        model = Track
        read_only_fields = ('plays')

class AlbumSerializer(serializers.ModelSerializer):

    url = serializers.HyperlinkedIdentityField(view_name='album-detail', read_only=True)
    number_of_tracks = serializers.SerializerMethodField()
    listing = serializers.HyperlinkedIdentityField(view_name='album-track-list', read_only=True)

    class Meta:
        fields = ('album_name', 'artist', 'year', 'genre', 'number_of_tracks', 'url', 'id', 'listing')
        model = Album

    def get_number_of_tracks(self, obj):
        return obj.tracks.all().count()

class CompleteAlbumSerializer(serializers.ModelSerializer):
    #track_set = serializers.StringRelatedField(many=True, read_only=True)
    tracks = TrackSerializer(many=True, read_only=True)
    url = serializers.HyperlinkedIdentityField(view_name='album-detail', read_only=True)
    listing = serializers.HyperlinkedIdentityField(view_name='album-track-list', read_only=True)

    class Meta:
        fields = ('album_name', 'artist', 'year', 'genre', 'tracks', 'url', 'id', 'listing')
        model = Album

    """ Tracks Update / WIP
    def validate(self, data):
        tracks = data.get('tracks', [])
        orders = [track['order'] for track in tracks]
        seen = set()
        #Check that order is unique without going thru the whole list
        if any(order in seen or seen.add(order) for order in orders):
            raise serializers.ValidationError('Track number must be unique on the album')
        return data
    """

    def update(self, instance, validated_data):
        #tracks_data = validated_data.pop('tracks')

        instance.album_name = validated_data.get('album_name', instance.album_name)
        instance.artist = validated_data.get('artist', instance.artist)
        instance.year = validated_data.get('year', instance.year)
        instance.genre = validated_data.get('genre', instance.genre)
        instance.save()

        """ Tracks Update / WIP
        track_ids = []
        for track_data in tracks_data:
            track = Track.objects.filter(album=instance, order=track_data['order']).first()
            if track: track_ids.append(track.id);

        for item in instance.tracks.iterator():
            if item.id not in track_ids:
                item.delete()

        for item in tracks_data:
            track = Track(album=instance, title=item['title'],
                          duration=item['duration'], order=item['order'] )
            track.save()
        """

        return instance

class UserSerializer(serializers.ModelSerializer):

    phone = serializers.CharField(source='profile.phone')
    is_admin = serializers.BooleanField(source='profile.is_admin')

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'phone','is_admin')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        profile = validated_data.pop('profile', {})

        user = User.objects.create_user(**validated_data)

        UserProfile.objects.create(user=user, **profile)

        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.email)
        instance.save()

        profile = UserProfile.objects.get(user=instance)
        profile.phone = validated_data.get('phone', profile.phone)
        profile.is_admin = validated_data.get('is_admin', profile.is_admin)

        return instance
