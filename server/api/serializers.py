from rest_framework import serializers
from .models import Album, Track
from .serializer_fields import ParameterisedHyperlinkedIdentityField

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
